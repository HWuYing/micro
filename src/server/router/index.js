import express from 'express';
import globalUse from 'fe-library/lib/core/glob.router';
import { javaGlobalAPI } from '../core/remoteInterface';
import distribution from './distribution';
import company from './company';
import activity from './activity';
import uCurrency from './uCurrency';
import marketing from './marketing';
import globalEnum from './globalEnum';

const router = express.Router();

globalUse(router, javaGlobalAPI);
// 全局枚举值
router.use('/globalEnum', globalEnum);

router.use('/distribution', distribution);
router.use('/activity', activity);
router.use(company);
router.use('/uCurrency', uCurrency);
router.use('/marketingDirector', marketing);

export default router;
