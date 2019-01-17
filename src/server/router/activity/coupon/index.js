import express from 'express';
import { factory } from 'fe-library/lib/core/app';
import { javaActivityApi } from '../../../core/remoteInterface';
import * as api from './api.config';

const router = express.Router();

router.post('/pageList', factory(async (req, res) => {
  return javaActivityApi(req, res).post(api.getList, req.body);
}));

router.get('/detail/:id', factory(async (req, res) => {
  const { id } = req.params;
  return javaActivityApi(req, res).get(api.detail(id));
}));

router.post('/delete', factory(async (req, res) => {
  return javaActivityApi(req, res).post(api.deleteActivity, req.body);
}));

router.post('/save', factory(async (req, res) => {
  return javaActivityApi(req, res).post(api.save, req.body);
}));

export default router;
