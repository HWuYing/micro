import { initReducers } from '@applyStore';
import * as Action from '../action/index';

const initialState = {
  distributionList: {
    list: [],
    total: 0,
  },
  subordinateList: {
    list: [],
    total: 0,
  },
  withdrawMap: {},
  orderList: {
    list: [],
    total: 0,
  },
  defConfig: {},
  companyConfig: {},
};
const handlers = {
  [Action.GET_DISTRIBUTION_LIST](state, { data, total }) {
    return {
      ...state,
      storeList: {
        list: data,
        total,
      },
    }
  },
  [Action.GET_SUBORDINSTE_LIST](state, { data, total }) {
    return {
      ...state,
      subordinateList: {
        list: data,
        total,
      },
    }
  },
  [Action.GET_ORDER_LIST](state, { data, total }) {
    return {
      ...state,
      orderList: {
        list: data,
        total,
      },
    }
  },
  [Action.GET_WITHDRAW_LIST](state, { data, total, enumKey }) {
    const { withdrawMap } = state;
    return {
      ...state,
      withdrawMap: {
        ...withdrawMap,
        [enumKey]: {
          list: data,
          total,
        },
      },
    }
  },
  [Action.GET_DEF_CONFIG](state, { data }) {
    return {
      ...state,
      defConfig: data,
    }
  },
  [Action.GET_COMPANY_CONFIG](state, { data }) {
    return {
      ...state,
      companyConfig: data,
    }
  },
};

export default initReducers(handlers, initialState);
