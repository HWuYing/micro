import { fetch } from '@util';

const { post, get } = fetch;

export const getList = async (body, context) => post('/distribution/queryList', { context, body });

export const getDetail = async (body, context) => {
  const { id } = body;
  if (!id || id.toString() === '0') return { data: {} };
  return get(`/distribution/detail/${body.id}`, { context });
};

export const audit = async (body, context) => post('/distribution/audit', { context, body });
// 下级经销商
export const getSubordinateList = async (body, context) => post('/distribution/subordinate/queryList', { context, body });
// 经销商订单列表
export const getOrderList = async (body, context) => post('/distribution/order/queryList', { context, body });
// 开启分销码
export const openDistribute = async (body, context) => post('/distribution/code/openBatch', { body, context });
// 关闭分销码
export const closeDistribute = async (body, context) => post('/distribution/code/closeBatch', { body, context });
// 默认分拥
export const getDefConfig = async (body, context) => get('/distribution/config/def/get', { body, context });
export const mergeDefConfig = async (body, context) => post('/distribution/config/def/merge', { body, context });
// 企业分拥
export const getCompanyConfig = async (body, context) => get('/distribution/config/company/get', { body, context });
export const mergeCompanyConfig = async (body, context) => post('/distribution/config/company/merge', { body, context });
// 下级经销商提现列表
export const getWithdrawList = async (body, context) => post('/distribution/withdraw/queryList', { body, context });
// 下级经销商提现详情
export const getWithdrawDetail = async (body, context) => {
  const { id } = body;
  if (!id || id.toString() === '0') return { data: {} };
  return get(`/distribution/withdraw/detail/${body.id}`, { context });
};
// 经销商提现审核
export const auditWithdraw = async (body, context) => post(`/distribution/withdraw/audit`, { body, context });
