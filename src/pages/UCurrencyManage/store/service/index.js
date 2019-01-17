import { fetch } from '@util';

const { post, get } = fetch;

export const query = async (body, httpOptions) => post('/uCurrency/list', { httpOptions, body });
export const transfer = async (body, httpOptions) =>
  post('/uCurrency/transfer', { httpOptions, body });
export const recharge = async (body, httpOptions) =>
  post('/uCurrency/recharge', { httpOptions, body });
export const detail = async (body, httpOptions) =>
  get(`/uCurrency/detail/${body}`, { httpOptions });
export const accountDetail = async (body, httpOptions) =>
  get('/uCurrency/accountDetail', { httpOptions, body });
export const exchangeDetail = async (body, httpOptions) =>
  get('/uCurrency/exchangeDetail', { httpOptions, body });
export const exchangeModify = async (body, httpOptions) =>
  post('/uCurrency/exchangeModify', { httpOptions, body });
export const payment = async (body, httpOptions) =>
  post('/uCurrency/payment', { httpOptions, body });
export const statistics = async (body, httpOptions) =>
  get('/uCurrency/statistics', { httpOptions, body });
