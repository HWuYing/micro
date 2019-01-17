import express from 'express';
import { factory } from 'fe-library/lib/core/app';
import { javaUserAPI } from '../../../core/remoteInterface';
import * as api from './api.config';

const router = express.Router();

router.post('/list', factory(async (req, res) => {
  return javaUserAPI(req, res).post(api.getList, req.body);
}));

router.get('/detail/:id', factory(async (req, res) => {
  const { id } = req.params;
  return javaUserAPI(req, res).get(api.detail(id));
}));

router.post('/save', factory(async (req, res) => {
  return javaUserAPI(req, res).post(api.save, req.body);
}));

export default router;
