import { API_VERSION } from '../../config';

export const queryList = `/distributor/${API_VERSION}/queryPage`;
export const getDetail = id => `/distributor/${API_VERSION}/get/${id}`;
export const audit = `/distributor/${API_VERSION}/audit`;
// 下级创客
export const subordinateList = `/distributor/${API_VERSION}/subordinate/queryPage`;
// 经销商下级创客提现列表
export const withdrawList = `/achievement/${API_VERSION}/distributorWithdraw/queryPage`;
// 经销商提现审核
export const withdrawAudit = `/achievement/${API_VERSION}/withdraw/audit`;
// 创客提现详情
export const withdrawDetail = id => `/achievement/${API_VERSION}/withdraw/detail/${id}`;
// 创客订单列表
export const orderList = `/achievement/${API_VERSION}/order/queryPage`;
// 启用分销码（批量）
export const openDistributionCode = `/distributor/${API_VERSION}/openBatch`;
// 禁用分销码(批量)
export const closeDistributionCode = `/distributor/${API_VERSION}/closeBatch`;
// 平台经销商分拥配置
export const getDefConfig = `/config/${API_VERSION}/deft/get`;
export const mergeDefConfig = `/config/${API_VERSION}/deft/merge`;
// 其他项目经销商分拥配置
export const getCompanyConfig = `/config/${API_VERSION}/company/get`;
export const mergeCompanyConfig = `/config/${API_VERSION}/company/merge`;
