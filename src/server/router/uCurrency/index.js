import express from 'express';
import { factory } from 'fe-library/lib/core/app';
import { javaPaymentApi } from '../../core/remoteInterface';
import * as api from './api.config';

const router = express.Router();

router.post(
  '/list',
  factory(async (req, res) => {
    return javaPaymentApi(req, res).post(api.getList, req.body);
  })
);

router.get(
  '/detail/:id',
  factory(async (req, res) => {
    const { id } = req.params;
    return javaPaymentApi(req, res).get(api.getDetail(id), req.body);
  })
);

router.post(
  '/recharge',
  factory(async (req, res) => {
    return javaPaymentApi(req, res).post(api.recharge, req.body);
  })
);

router.post(
  '/transfer',
  factory(async (req, res) => {
    return javaPaymentApi(req, res).post(api.transfer, req.body);
  })
);

router.get(
  '/accountDetail',
  factory(async (req, res) => {
    return javaPaymentApi(req, res).get(api.accountDetail, req.body);
  })
);

router.get(
  '/statistics',
  factory(async (req, res) => {
    return javaPaymentApi(req, res).get(api.statistics, req.body);
  })
);
router.get(
  '/exchangeDetail',
  factory(async (req, res) => {
    return javaPaymentApi(req, res).get(api.exchangeDetail, req.body);
  })
);

router.post(
  '/exchangeModify',
  factory(async (req, res) => {
    return javaPaymentApi(req, res).post(api.exchangeModify, req.body);
  })
);

router.post(
  '/payment',
  factory(async (req, res) => {
    return javaPaymentApi(req, res).post(api.payment, req.body);
  })
);

export default router;
