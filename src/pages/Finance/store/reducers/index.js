import { initReducers } from '@applyStore';
import * as Action from '../action/index';
import { GET_STORE_WITHDRAW_LIST } from '../action';

const initialState = {
  incomeMap: {},
  withdrawMap: {},
  statistics: {},
};

const handlers = {
  [Action.GET_INCOME_LIST](state, { data, total, enumKey }) {
    const { incomeMap } = state;
    return {
      ...state,
      incomeMap: {
        ...incomeMap,
        [enumKey]: {
          list: data,
          total,
        },
      },
    }
  },
  [Action.GET_STORE_WITHDRAW_LIST](state, { data, total, enumKey }) {
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
  [Action.GET_STATISTICS](state, { data }) {
    return {
      ...state,
      statistics: data,
    }
  },
};

export default initReducers(handlers, initialState);
