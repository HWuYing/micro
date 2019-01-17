/* eslint-disable no-undef */
import { API_VERSION } from '../../../config';

// 企业列表
export const pageList = `/company/${API_VERSION}/pageList`;
export const chgStatus = `/company/${API_VERSION}/chgStatus`;
export const closeDistribute = `/company/${API_VERSION}/closeDistribute`;
export const openDistribute = `/company/${API_VERSION}/openDistribute`;
export const invitationCode = id => `/company/${API_VERSION}/invitationCode/${id}`;
// 企业佣金收益列表
export const getIncomeList = `/achievement/${API_VERSION}/income/queryPage`;
// 企业佣金详情
export const getIncomeDetail = id => `/achievement/${API_VERSION}/income/detail/${id}`;
// 企业佣金审核列表
export const getWithdrawList = `/achievement/${API_VERSION}/companyWithdraw/queryPage`;
// 企业订单数据
export const getOrderList = `/achievement/${API_VERSION}/order/queryPage`;
// 企业创客数据
export const getDistributeList = `/distributor/${API_VERSION}/queryPage`;
// 企业佣金提现信息
export const getCompanyAchievementInfo = `/achievement/${API_VERSION}/company/statistics`;
