import express from 'express';
import { factory } from 'fe-library/lib/core/app';
import { javaDistributionApi  } from '../../core/remoteInterface';
import * as api from './api.config';

const router = express.Router();

router.post('/queryList', factory(async (req, res) => {
  return javaDistributionApi(req, res).post(api.queryList, req.body);
}));

router.get('/detail/:id', factory(async (req, res) => {
  const { id } = req.params;
  return javaDistributionApi(req, res).get(api.getDetail(id), {});
}));

router.post('/audit', factory(async (req, res) => {
  return javaDistributionApi(req, res).post(api.audit, req.body);
}));

router.post('/subordinate/queryList', factory(async (req, res) => {
  return javaDistributionApi(req, res).post(api.subordinateList, req.body);
}));

router.post('/order/queryList', factory(async (req, res) => {
  return javaDistributionApi(req, res).post(api.orderList, req.body);
}));

router.post('/withdraw/queryList', factory(async (req, res) => {
  return javaDistributionApi(req, res).post(api.withdrawList, req.body);
}));

router.get('/withdraw/detail/:id', factory(async (req, res) => {
  const { id } = req.params;
  return javaDistributionApi(req, res).get(api.withdrawDetail(id), {});
}));

router.post('/withdraw/audit', factory(async (req, res) => {
  return javaDistributionApi(req, res).post(api.withdrawAudit, req.body);
}));

router.post('/code/closeBatch', factory(async (req, res) => {
  return javaDistributionApi(req, res).post(api.closeDistributionCode, req.body);
}));

router.post('/code/openBatch', factory(async (req, res) => {
  return javaDistributionApi(req, res).post(api.openDistributionCode, req.body);
}));

router.get(`/config/def/get`, factory(async (req, res) => {
  return javaDistributionApi(req, res).get(api.getDefConfig, req.body);
}));

router.post(`/config/def/merge`, factory(async (req, res) => {
  return javaDistributionApi(req, res).post(api.mergeDefConfig, req.body);
}));

router.get(`/config/company/get`, factory(async (req, res) => {
  return javaDistributionApi(req, res).get(api.getCompanyConfig, req.body);
}));

router.post(`/config/company/merge`, factory(async (req, res) => {
  return javaDistributionApi(req, res).post(api.mergeCompanyConfig, req.body);
}));

export default router;
