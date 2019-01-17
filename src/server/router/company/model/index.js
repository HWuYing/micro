import express from 'express';
import { factory } from 'fe-library/lib/core/app';
import { javaStoreApi, javaUserAPI, javaDistributionApi } from '../../../core/remoteInterface';
import * as api from './api.config';

const router = express.Router();

router.post('/pageList', factory(async (req, res) => {
  return javaUserAPI(req, res).post(api.pageList, req.body);
}));

router.post('/chgStatus', factory(async (req, res) => {
  return javaUserAPI(req, res).post(api.chgStatus, req.body);
}));

router.post('/distribute/close', factory(async (req, res) => {
  return javaStoreApi(req, res).post(api.closeDistribute, req.body);
}));

router.post('/distribute/open', factory(async (req, res) => {
  return javaStoreApi(req, res).post(api.openDistribute, req.body);
}));

router.get('/invitationCode/:companyId', factory(async (req, res) => {
  const { companyId } = req.params;
  return javaStoreApi(req, res).get(api.invitationCode(companyId), {});
}));

router.post('/income/queryList', factory(async (req, res) => {
  return javaDistributionApi(req, res).post(api.getIncomeList, req.body);
}));

router.get('/income/detail/:id', factory(async (req, res) => {
  const { id } = req.params;
  return javaDistributionApi(req, res).get(api.getIncomeDetail(id), req.body);
}));

router.post('/withdraw/queryList', factory(async (req, res) => {
  return javaDistributionApi(req, res).post(api.getWithdrawList, req.body);
}));

router.post('/order/queryList', factory(async (req, res) => {
  return javaDistributionApi(req, res).post(api.getOrderList, req.body);
}));

router.post('/distributor/queryList', factory(async (req, res) => {
  return javaDistributionApi(req, res).post(api.getDistributeList, req.body);
}));

router.get('/achievement/statistics', factory(async (req, res) => {
  return javaDistributionApi(req, res).get(api.getCompanyAchievementInfo, req.body);
}));

export default router;
