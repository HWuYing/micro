import express from 'express';
import { factory } from 'fe-library/lib/core/app';
import { javaActivityApi } from '../../../core/remoteInterface';
import * as api from './api.config';

const router = express.Router();

router.post('/scanCodePresentation/pageList', factory(async (req, res) => {
  return javaActivityApi(req, res).post(api.getList, req.body);
}));

router.post('/scanCodePresentation/save', factory(async (req, res) => {
  return javaActivityApi(req, res).post(api.saveCoinGive, req.body);
}));

router.post('/scanCodePresentation/delete', factory(async (req, res) => {
  return javaActivityApi(req, res).post(api.deleteCoinGive, req.body);
}));

router.get('/scanCodePresentation/tarFile/:id', factory(async (req, res) => {
  const { id } = req.params;
  return javaActivityApi(req, res).get(api.tarFileCoinGive(id), req.body);
}));

export default router;
