import { initReducers } from '@applyStore';
import * as Action from '../action/index';

const initialState = {
  marketingDirectorList: {},
  relationServiceProviderList: {},
};

const handlers = {
  [Action.GET_MARKETING_DIRECTOR_LIST](state, { data, total }) {
    return {
      ...state,
      marketingDirectorList: {
        list: data,
        total,
      },
    }
  },
  [Action.GET_RELATION_SERVICE_PROVIDER_LIST](state, { data, total }) {
    return {
      ...state,
      relationServiceProviderList: {
        list: data,
        total,
      },
    }
  },
};

export default initReducers(handlers, initialState);
