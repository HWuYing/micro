import * as service from '../service/index';

export const getList = (param, httpOptions) => async () => {
  const res = await service.query(param, httpOptions);
  return res;
};

export const detail = (param, httpOptions) => async () => {
  const res = await service.detail(param, httpOptions);
  const { data } = res;

  return data;
};

export const recharge = (param, httpOptions) => async () => {
  const res = await service.recharge(param, httpOptions);
  return res;
};

export const transfer = (param, httpOptions) => async () => {
  const res = await service.transfer(param, httpOptions);
  return res;
};

export const accountDetail = (param, httpOptions) => async () => {
  const res = await service.accountDetail(param, httpOptions);
  return res;
};

export const statistics = (param, httpOptions) => async () => {
  const res = await service.statistics(param, httpOptions);
  return res.data;
};

export const payment = (param, httpOptions) => async () => {
  const res = await service.payment(param, httpOptions);
  return res;
};

export const exchangeDetail = (param, httpOptions) => async () => {
  const res = await service.exchangeDetail(param, httpOptions);
  return res.data;
};

export const exchangeModify = (param, httpOptions) => async () => {
  const res = await service.exchangeModify(param, httpOptions);
  return res;
};
