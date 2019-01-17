import * as service from '../service/index';

const namespace='fe-finance-manage';

export const GET_INCOME_LIST = `${namespace}GET_INCOME_LIST`;
export const GET_STORE_WITHDRAW_LIST = `${namespace}GET_STORE_WITHDRAW_LIST`;
export const GET_STATISTICS = `${namespace}GET_STATISTICS`;

export const getIncomeList = ({ enumKey, ...reset }, context) => async dispatch => {
  const result = await service.getIncomeList(reset, context);
  const { data, total } = result;
  dispatch({
    type: GET_INCOME_LIST,
    data,
    total,
    enumKey,
  });
  return result;
};

export const getCompanyAchievementInfo = (body, context) => async dispatch => {
  const result = await service.getCompanyAchievementInfo(body, context);
  const { data } = result;
  dispatch({
    type: GET_STATISTICS,
    data,
  });
  return result;
};

export const getWithdrawDetail = (body, context) => async () => service.getWithdrawDetail(body, context);

export const applyWithdraw = (body, context) => async () => service.applyWithdraw(body, context);

export const auditStoreWithdraw = (body, context) => async () => service.auditStoreWithdraw(body, context);

export const getStoreWithdrawList = ({ enumKey, ...reset }, context) => async dispatch => {
  const result = await service.getStoreWithdrawList(reset, context);
  const { data , total } = result;
  dispatch({
    type: GET_STORE_WITHDRAW_LIST,
    data,
    total,
    enumKey,
  });
  return result;
};

export const getIncomeDetail = (body, context) => async () => {
  const result = await service.getIncomeDetail(body, context);
  return result;
};

