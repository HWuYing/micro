import * as service from '../service/index';

const namespace='fe-channel-manage';

export const GET_STORE_LOWER_LIST = `${namespace}GET_STORE_LOWER_LIST`;

export const getStoreLowerList = (body, context) => async dispatch => {
  const { enumKey, ...reset } = body;
  return service.getStoreLowerList(reset, context);
};
