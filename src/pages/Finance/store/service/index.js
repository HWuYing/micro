import { fetch } from '@util';

const { post, get } = fetch;

export const getIncomeList = async (body, context) => post('/company/income/queryList', { context, body });

export const getIncomeDetail = async (body, context) => {
  const { id } = body;
  if (!id || id.toString() === '0') return { data: {} };
  return get(`/company/income/detail/${body.id}`, { context });
};

export const getStoreWithdrawList = async (body, context) => post('/store/withdraw/queryList', { context, body });

export const getWithdrawDetail = async (body, context) => {
  const { id } = body;
  if (!id || id.toString() === '0') return { data: {} };
  return get(`/store//withdraw/detail/${body.id}`, { context });
};
// 门店提现审核
export const auditStoreWithdraw = async (body, context) => post(`/store/withdraw/audit`, { context, body });
// 获取企业提现信息
export const getCompanyAchievementInfo = async (body, context) => get(`/company/achievement/statistics`, { body, context });
// 门店发起提现
export const applyWithdraw = async (body, context) => post(`/store/withdraw/save`, { body, context });
