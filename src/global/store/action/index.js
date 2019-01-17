import * as service from '../service';

const namespace = 'global';

export const GET_BANK_LIST = `${namespace}GET_BANK_LIST`;
export const GET_STORE_LIST = `${namespace}GET_STORE_LIST`;

export const getBankList = (body, context) => async dispatch => {
  const result  = await service.getBankList(body, context);
  const { data } = result;
  dispatch({
    type: GET_BANK_LIST,
    data,
  });
  return result;
};

export const getStoreList = (body, context) => async dispatch => {
  const result  = await service.getStoreList(body, context);
  const { data } = result;
  dispatch({
    type: GET_STORE_LIST,
    data,
  });
  return result;
};
