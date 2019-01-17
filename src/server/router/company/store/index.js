import express from 'express';
import { factory } from 'fe-library/lib/core/app';
import { javaStoreApi, javaPaymentApi } from '../../../core/remoteInterface';
import * as api from './api.config';

const router = express.Router();

router.post('/list', factory(async (req, res) => {
  return javaStoreApi(req, res).post(api.storeList, req.body);
}));

router.get('/detail/:id', factory(async (req, res) => {
  const { id } = req.params;
  return javaStoreApi(req, res).get(api.storeDetail(id), req.body);
}));

router.post('/save', factory(async (req, res) => {
  return javaStoreApi(req, res).post(api.storeSave, req.body);
}));

router.post('/delete', factory(async (req, res) => {
  return javaStoreApi(req, res).post(api.storeDelete, req.body);
}));

router.post('/subChannel/list', factory(async (req, res) => {
  return javaStoreApi(req, res).post(api.subChannelList, req.body);
}));

router.post('/withdraw/audit', factory(async (req, res) => {
  return javaPaymentApi(req, res).post(api.auditApplyExtract, req.body);
}));

router.get('/withdraw/detail/:id', factory(async (req, res) => {
  const { id } = req.params;
  return javaPaymentApi(req, res).get(api.getStoreApplyExtract(id), req.body);
}));

router.post('/withdraw/save', factory(async (req, res) => {
  return javaPaymentApi(req, res).post(api.saveStoreApplyExtract, req.body);
}));

router.post('/withdraw/queryList', factory(async (req, res) => {
  return javaPaymentApi(req, res).post(api.getExtractList, req.body);
}));

export default router;
