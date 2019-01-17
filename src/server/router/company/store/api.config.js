import { API_VERSION } from '../../../config';

export const storeList = `/store/${API_VERSION}/pageList`;
export const storeDetail = (id) => `store/${API_VERSION}/detail/${id}`;
export const storeSave = `/store/${API_VERSION}/save`;
export const storeDelete = `store/${API_VERSION}/delete`;
export const subChannelList = `/store/${API_VERSION}/subChannel`;
// 门店拥金提现单详情
export const getStoreApplyExtract = id => `/extractOrder/${API_VERSION}/detail/${id}`;
// 门店佣金发起提现
export const saveStoreApplyExtract = `/extractOrder/${API_VERSION}/commit`;
// 门店列表
export const getExtractList = `/extractOrder/${API_VERSION}/query`;
// 门店提现审核
export const auditApplyExtract = `/extractOrder/1/audit`;
