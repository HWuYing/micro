import * as service from '../service/index';

const namespace='fe-company-manage';

export const SAVE_DECOR = `${namespace}SAVE_DECOR`;
export const DETAIL_DECOR = `${namespace}DETAIL_DECOR`;
export const GET_DECOR_LIST = `${namespace}GET_DECOR_LIST`;
export const GET_DECOR_ORDER_LIST = `${namespace}GET_ORDER_LIST`;
export const GET_DECOR_DISTRIBUTOR_LIST = `${namespace}GET_DECOR_DISTRIBUTOR_LIST`;

export const GET_PROVIDER_LIST = `${namespace}GET_PROVIDER_LIST`;
export const CHANGE_COMPANY_STATUS = `${namespace}CHANGE_COMPANY_STATUS`;
export const GET_INVITATION_CODE = `${namespace}GET_INVITATION_CODE`;

export const saveDecor = (body, context) => async () => {
  const result = await service.saveDecor(body, context);
  return result;
};

export const saveProvider = (body, context) => async () => {
  const result = await service.saveProvider(body, context);
  return result;
};

export const getDetailDecor = (body, context) => async () => {
  const result = await service.getDetailDecor(body, context);
  return result;
};

export const getDetailProvider = (body, context) => async () => {
  const result = await service.getDetailProvider(body, context);
  return result;
};

export const getDecorList = (body, context) => async dispatch => {
  const { enumKey, ...reset } = body;
  const result = await service.getDecorList(reset, context);
  const { data, total } = result;
  dispatch({
    type: GET_DECOR_LIST,
    data,
    total,
    enumKey,
  });
  return result;
};

export const getDecorOrderList = (body, context) => async dispatch => {
  const result = await service.getOrderList(body, context);
  const { data, total } = result;
  dispatch({
    type: GET_DECOR_ORDER_LIST,
    data,
    total,
  });
  return result;
};

export const getDecorDistributorList = (body, context) => async dispatch => {
  const result = await service.getDistributorList(body, context);
  const { data, total } = result;
  dispatch({
    type: GET_DECOR_DISTRIBUTOR_LIST,
    data,
    total,
  });
  return result;
};

export const getInvitationCode = (body, context) => async dispatch => {
  const result = await service.invitationCode(body, context);
  const { data } = result;
  dispatch({
    type: GET_INVITATION_CODE,
    data,
  });
  return result;
};

export const getProviderList = (body, context) => async dispatch => {
  const { enumKey, ...reset } = body;
  const result = await service.getProviderList(reset, context);
  const { data, total } = result;
  dispatch({
    type: GET_PROVIDER_LIST,
    data,
    total,
    enumKey,
  });
  return result;
};

export const changeCompanyStatus = (body, context) => async () => {
  const result = await service.companyChgStatus(body, context);
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

