import * as service from '../service/index';

const namespace='fe-store-manage';

export const GET_STORE_LIST = `${namespace}GET_STORE_LIST`;
export const GET_STORE_DETAILS = `${namespace}GET_STORE_DETAILS`;
export const SAVE_STORE = `${namespace}SAVE_STORE`;
export const GET_DECOR_LIST = `${namespace}GET_DECOR_LIST`;
export const GET_INVITATION_CODE = `${namespace}GET_INVITATION_CODE`;

export const getList = (body, context) => async dispatch => {
  const { data, total } = await service.getList(body, context);
  dispatch({
    type: GET_STORE_LIST,
    data,
    total,
  });
};

export const save = (body, context) => async () => {
  const result = await service.save(body, context);
  return result;
};

export const getDetail = (body, context) => async dispatch => {
  const { data } = await service.getDetail(body, context);
  dispatch({
    type: GET_STORE_DETAILS,
    data,
  });
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

export const deleteStore = (body, context) => async () => {
  const result = await service.deleteStore(body, context);
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

export const getDecorList = (body, context) => async dispatch => {
  const { data, total } = await service.getDecorList(body, context);
  dispatch({
    type: GET_DECOR_LIST,
    data,
    total,
  })
};
