import { fetch } from '@util';
import { API_VERSION } from '../../../server/config';

const { get, post } = fetch;

export const getBankList = async (body, context) => post(`/global/payment/w/api/extractOrder/${API_VERSION}/bankQuery`, {
  body:{ pageNum: 1, pageSize: 9999, ...body },
  context,
});

export const getStoreList = async (body, context) => post(`/global/user/w/api/store/${API_VERSION}/list`, {
  body:{ pageNum: 1, pageSize: 9999, ...body },
  context,
});
