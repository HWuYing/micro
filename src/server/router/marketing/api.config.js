import { API_VERSION } from '../../config';

// 营销总监列表
export const marketingList = `/marketingDirector/${API_VERSION}/pageList`;
// 营销总监详情
export const marketingDetail = id => `/marketingDirector/${API_VERSION}/detail/${id}`;
// 保存营销总监
export const marketingSave = `/marketingDirector/${API_VERSION}/save`;
// 保存营销总监
export const marketingDelete = `/marketingDirector/${API_VERSION}/delete`;
// 关联服务商
export const marketingProviderPageList = `/marketingDirector/${API_VERSION}/providerPageList`;
// 解除关联
export const marketingFireBindProvider = id => `/marketingDirector/${API_VERSION}/fireBind/${id}`;
// 修改分销比例
export const marketingChangeDistrictRate = `/marketingDirector/${API_VERSION}/chgDistrictRate`;


