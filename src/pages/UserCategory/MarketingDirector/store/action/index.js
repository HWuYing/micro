import * as service from '../service/index';

const namespace='micro-user-category-manage';

export const GET_MARKETING_DIRECTOR_LIST = `${namespace}GET_MARKETING_DIRECTOR_LIST`;
export const GET_MARKETING_DIRECTOR_DETAIL = `${namespace}GET_MARKETING_DIRECTOR_DETAIL`;
export const SAVE_MARKETING_DIRECTOR = `${namespace}SAVE_MARKETING_DIRECTOR`;

export const GET_RELATION_SERVICE_PROVIDER_LIST = `${namespace}GET_RELATION_SERVICE_PROVIDER_LIST`;

export const getMarketingDirectorList = (body, context) => async dispatch => {
  const { ...reset } = body;
  const { data, total } = await service.getMarketingDirectorList(reset, context);
  dispatch({
    type: GET_MARKETING_DIRECTOR_LIST,
    data,
    total,
  });
};

export const getMarketingDirectorDetail = (body, context) => async () => {
  return service.getMarketingDirectorDetail(body, context);
};

export const saveMarketingDirector = (body, context) => async () => service.saveMarketingDirector(body, context);

export const deleteMarketingDirector = (body, context) => async () => service.deleteMarketingDirector(body, context);

export const fireBindMarketingProvider = (body, context) => async () => service.fireBindMarketingProvider(body, context);

export const changeDistrictRate = (body, context) => async () => service.changeDistrictRate(body, context);

export const getRelationServiceProviderList = (body, context) => async dispatch => {
  const { ...reset } = body;
  const { data, total } = await service.getRelationServiceProviderList(reset, context);
  dispatch({
    type: GET_RELATION_SERVICE_PROVIDER_LIST,
    data,
    total,
  });
};
