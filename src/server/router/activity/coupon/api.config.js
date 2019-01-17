/* eslint-disable no-undef */
import { API_VERSION } from '../../../config';

export const getList = `/coupon/${API_VERSION}/pageList`;
export const save = `/coupon/${API_VERSION}/save`;
export const detail = id => `/coupon/${API_VERSION}/detail/${id}`;
export const deleteActivity = `/coupon/${API_VERSION}/delete`;
