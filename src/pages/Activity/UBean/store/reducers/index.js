import { initReducers } from '@applyStore';
import * as Action from '../action/index';

const initialState = {
  scanCodePresentationList: {},
};

const handlers = {
  [Action.GET_U_BEAN_SCAN_CODE_PRESENTATION_QUERY_LIST](state, { data, total }) {
    return {
      ...state,
      scanCodePresentationList: {
        list: data,
        total,
      },
    }
  },
};

export default initReducers(handlers, initialState);
