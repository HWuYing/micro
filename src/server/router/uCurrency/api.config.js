import { API_VERSION } from '../../config';

export const getList = `/coin/${API_VERSION}/transactionQuery`;
export const getDetail = id => `/coin/${API_VERSION}/transactionDetail/${id}`;
export const accountDetail = `/coin/${API_VERSION}/accountDetail`;
export const recharge = `/coin/${API_VERSION}/recharge`;
export const transfer = `/coin/${API_VERSION}/transfer`;
export const exchangeDetail = `/coin/${API_VERSION}/exchange`;
export const exchangeModify = `/coin/${API_VERSION}/modifyExchange`;
export const payment = `/coin/${API_VERSION}/payment`;
export const statistics = `/coin/${API_VERSION}/statistics`;
