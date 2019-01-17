import { initReducers } from '@applyStore';
import * as Action from '../action/index';

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
  [Action.GET_DECOR_LIST](state, { data, total }) {
    return {
      ...state,
      lowerList: {
        list: data,
        total,
      },
    };
  },
  [Action.GET_STORE_DETAILS](state, { data }) {
    return {
      ...state,
      storeDetail: data,
    };
  },
  [Action.GET_INVITATION_CODE](state, { data }) {
    return {
      ...state,
      invitationCode: data,
    }
  },
};

export default initReducers(handlers, initialState);
