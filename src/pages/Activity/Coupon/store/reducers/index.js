import { initReducers } from '@applyStore';
import * as Action from '../action/index';

const initialState = {
  couponList: {
    list: [],
    total: 0,
  },
};

const handlers = {
  [Action.GET_ACTIVITY_COUPON_LIST](state, { data, total }) {
    return {
      ...state,
      couponList: {
        list: data,
        total,
      },
    }
  },
};

export default initReducers(handlers, initialState);
