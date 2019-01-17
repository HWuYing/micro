import express from 'express';
import { factory } from 'fe-library/lib/core/app';
import { javaUserAPI } from '../../core/remoteInterface';
import * as api from './api.config';

const router = express.Router();

router.post('/pageList', factory(async (req, res) => {
  return javaUserAPI(req, res).post(api.marketingList, req.body);
}));

router.get('/detail/:id', factory(async (req, res) => {
  const { id } = req.params;
  return javaUserAPI(req, res).get(api.marketingDetail(id), req.body);
}));

router.post('/save', factory(async (req, res) => {
  return javaUserAPI(req, res).post(api.marketingSave, req.body);
}));

router.post('/delete', factory(async (req, res) => {
  return javaUserAPI(req, res).post(api.marketingDelete, req.body);
}));

router.post('/relationProvider/pageList', factory(async (req, res) => {
  return javaUserAPI(req, res).post(api.marketingProviderPageList, req.body);
}));

router.post('/relationProvider/fireBind/:id', factory(async (req, res) => {
  const { id } = req.params;
  return javaUserAPI(req, res).post(api.marketingFireBindProvider(id), req.body);
}));

router.post('/relationProvider/changeDistrictRate', factory(async (req, res) => {
  return javaUserAPI(req, res).post(api.marketingChangeDistrictRate, req.body);
}));


export default router;
