import React from 'react';
import ReactDOM from 'react-dom/server';
import { createLocation } from 'history';
import { SYSTEM } from '@common/config';
import applyComponent from '@applyComponent';
import App from '../App';

export default async (pathname, req, res) => {
  const location = { pathname };
  const { headers: { platform=SYSTEM } } = req;
  const context = {
    history: {
      location: createLocation(pathname),
      listen: f => f,
      createHref: () => {},
    },
    author: {
      system: platform,
    },
  };
  const list = await applyComponent({
    location,
    req,
    res,
  });

  if (list.length === 0) {
    const error = new Error('资源没有找到');
    error.status = 404;
    throw error;
  }
  return ReactDOM.renderToString(<App {...context} />);
};
