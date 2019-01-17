import express from 'express';
import store from './store';
import coupon from './coupon';
import uBean from './uBean';

const router = express.Router();

router.use('/store', store);
router.use('/coupon', coupon);
router.use('/uBean', uBean);

export default router;
