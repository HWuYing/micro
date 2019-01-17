import * as action from '../action';

const initialState = {
  bankList: [], // 银行列表
  storeList: [], // 门店列表
};

const handlers = {
  [action.GET_BANK_LIST](state, { data }) {
    return {
      ...state,
      bankList: data,
    };
  },
  [action.GET_STORE_LIST](state, { data }) {
    return {
      ...state,
      storeList: data,
    };
  },
};

export {
  handlers,
  initialState,
}
