import { initReducers } from '@applyStore';
import * as Action from '../action';

const initialState = {
  storeList: {
    list: [],
    total: 0,
  },
  lowerList: {
    list: [],
    total: 0,
  },
  storeDetail: {},
  invitationCode: {},
};

const handlers = {
  [Action.GET_STORE_LIST](state, { data, total }) {
    return {
      ...state,
      storeList: {
        list: data,
        total,
      },
    }
  },
};

export default initReducers(handlers, initialState);
