import createAPIServer from 'fe-library/lib/core/interface';
import { JAVA_HOST, PLATFORM } from '../config';


const javaAPI = createAPIServer(JAVA_HOST, PLATFORM);

// global
const javaGlobalAPI = createAPIServer(JAVA_HOST, PLATFORM);
// 用户
const javaUserAPI = createAPIServer(`${JAVA_HOST}/user/w/api`, PLATFORM);
// 门店
const javaStoreApi = createAPIServer(`${JAVA_HOST}/user/w/api`, PLATFORM);
// 经销商
const javaDistributionApi = createAPIServer(`${JAVA_HOST}/distribution/w/api`, PLATFORM);
// 活动
const javaActivityApi = createAPIServer(`${JAVA_HOST}/marketing/w/api`, PLATFORM);
// 支付
const javaPaymentApi = createAPIServer(`${JAVA_HOST}/payment/w/api`, PLATFORM);

export { javaAPI, javaGlobalAPI, javaStoreApi, javaDistributionApi, javaUserAPI, javaActivityApi, javaPaymentApi };
