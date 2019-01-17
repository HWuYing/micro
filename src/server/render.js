import express from 'express';
import path from 'path';
import createRender from '../server-entry/createRender';
import dll from '../../build/assets/dll';
import browser from '../../build/assets/browser';

const model = ['manifest', 'commons', 'vendors', 'client'];
const router = express.Router();
const render = createRender(path.join('build', './server-entry.js'));

const getStaticConfig = () => {
  return model.reduce(
    (json, key) => {
      if (!browser[key]) return json;
      if (browser[key].css) {
        json.linkList.push(browser[key].css);
        json.links.push(`<link rel="stylesheet" type="text/css" href="${browser[key].css}"/>`);
      }
      if (browser[key].js) {
        json.scriptList.push(browser[key].js);
        json.scripts.push(`<script src="${browser[key].js}"></script>`);
      }
      return json;
    },
    {
      scriptList: [dll.bundle.js],
      linkList: [],
      links: [],
      scripts: [`<script src="${dll.bundle.js}"></script>`],
    }
  );
};

router.get('/index.json', async (req, res) => {
  res.json(getStaticConfig());
});

router.get('/render/*', async (req, res, next) => {
  try {
    const pagePath = req.path.replace(/^\/render([\s\S]*)/, '$1');
    const html = await render(pagePath, req, res);
    res.end(html);
  } catch (e) {
    next(e);
  }
});

router.get('*', async (req, res, next) => {
  try {
    const json = getStaticConfig();
    const data = await render(req.path, req, res);
    // const data = null;
    res.write(`<!DOCTYPE html><html lang="en"><head>`);
    res.write(`<meta charset="utf-8">`);
    res.write(json.links.join(''));
    res.write(`</head><body>`);
    res.write(`<div id="app">${data}</div>`);
    res.write(json.scripts.join(''));
    res.end(`</body></html>`);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

export default router;
