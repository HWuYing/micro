import { stringify } from 'querystring';
import express from 'express';
import { factory } from 'fe-library/lib/core/app';
import { javaActivityApi } from '../../../core/remoteInterface';
import * as api from './api.config';

const router = express.Router();

router.post('/queryList', factory(async (req, res) => {
  return javaActivityApi(req, res).post(api.getList, req.body);
}));

router.get('/detail/:id', factory(async (req, res) => {
  const { id } = req.params;
  return javaActivityApi(req, res).get(api.getDetail(id), req.body);
}));

router.post('/save', factory(async (req, res) => {
  return javaActivityApi(req, res).post(api.save, req.body);
}));

router.post('/update', factory(async (req, res) => {
  return javaActivityApi(req, res).post(api.update, req.body);
}));

router.post('/change/state', factory(async (req, res) => {
  const { idList, state } = req.body;
  return javaActivityApi(req, res).post(api.batchChangeState(idList, state), req.body);
}));

router.post('/delete', factory(async (req, res) => {
  const { idList } = req.body;
  return javaActivityApi(req, res).post(api.batchDelete(idList), req.body);
}));

export default router;
