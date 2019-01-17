import { fetch } from '@util';

const { post, get } = fetch;

// 营销总监列表
export const getMarketingDirectorList = async (body, context) => post('/marketingDirector/pageList', {
  body,
  context,
});

// 营销总监详情
export const getMarketingDirectorDetail = async (body, context) => {
  const { id } = body;
  if (!id || id.toString() === '0') return { data: {} };
  return get(`/marketingDirector/detail/${body.id}`, { context });
};

// 营销总监下级服务商
export const getRelationServiceProviderList = async (body, context) => post('/marketingDirector/relationProvider/pageList', {
  body,
  context,
});

// 营销总监保存
export const saveMarketingDirector = async (body, context) => post('/marketingDirector/save', {
  body,
  context,
});

// 营销总监删除
export const deleteMarketingDirector = async (body, context) => post('/marketingDirector/delete', {
  body,
  context,
});

// 营销总监解除关联
export const fireBindMarketingProvider = async (body, context) => post(`/marketingDirector/relationProvider/fireBind/${body.id}`, {
  body,
  context,
});

// 营销总监修改分销配置
export const changeDistrictRate = async (body, context) => post(`/marketingDirector/relationProvider/changeDistrictRate`, {
  body,
  context,
});
