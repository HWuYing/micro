import * as service from '../service/index';

const namespace='fe-distributor-manage';

export const GET_DISTRIBUTION_LIST = `${namespace}GET_DISTRIBUTION_LIST`;
export const GET_SUBORDINSTE_LIST = `${namespace}GET_SUBORDINSTE_LIST`;
export const GET_ORDER_LIST = `${namespace}GET_ORDER_LIST`;
export const GET_DEF_CONFIG = `${namespace}GET_DEF_CONFIG`;
export const GET_COMPANY_CONFIG = `${namespace}GET_COMPANY_CONFIG`;
export const GET_WITHDRAW_LIST = `${namespace}GET_WITHDRAW_List`;

export const getList = (body, context) => async dispatch => {
  const result = await service.getList(body, context);
  const { data, total } = result;
  dispatch({
    type: GET_DISTRIBUTION_LIST,
    data,
    total,
  });
  return result;
};

export const getSubordinateList = (body, context) => async dispatch => {
  const result = await service.getSubordinateList(body, context);
  const { data, total } = result;
  dispatch({
    type: GET_SUBORDINSTE_LIST,
    data,
    total,
  });
  return result;
};

export const getOrderList = (body, context) => async dispatch => {
  const result = await service.getOrderList(body, context);
  const { data, total } = result;
  dispatch({
    type: GET_ORDER_LIST,
    data,
    total,
  });
  return result;
};

export const getWithdrawList = ({ enumKey, ...reset }, context) => async dispatch => {
  const result = await service.getWithdrawList(reset, context);
  const { data, total } = result;
  dispatch({
    type: GET_WITHDRAW_LIST,
    data,
    total,
    enumKey,
  });
  return result;
};

export const getWithdrawDetail = (body, context) => async () => {
  return service.getWithdrawDetail(body, context);
};

export const auditWithdraw = (body, context) => async () => {
  return service.auditWithdraw(body, context);
};

export const getDefConfig = (body, context) => async dispatch => {
  const result = await service.getDefConfig(body, context);
  const { data } = result;
  dispatch({
    type: GET_DEF_CONFIG,
    data,
  });
  return result;
};

export const mergeDefConfig = (body, context) => async () => {
  const result = await service.mergeDefConfig(body, context);
  return result;
};

export const getCompanyConfig = (body, context) => async dispatch => {
  const result = await service.getCompanyConfig(body, context);
  const { data } = result;
  dispatch({
    type: GET_COMPANY_CONFIG,
    data,
  });
  return result;
};

export const mergeCompanyConfig = (body, context) => async () => {
  const result = await service.mergeCompanyConfig(body, context);
  return result;
};

export const getDetail = (body, context) => async () => {
  const result = await service.getDetail(body, context);
  return result;
};

export const audit = (body, context) => async () => {
  const result = await service.audit(body, context);
  return result;
};

export const openDistribute = (body, context) => async () => {
  const result = await service.openDistribute(body, context);
  return result;
};

export const closeDistribute = (body, context) => async () => {
  const result = await service.closeDistribute(body, context);
  return result;
};
