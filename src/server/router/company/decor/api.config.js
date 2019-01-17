/* eslint-disable no-undef */
import { API_VERSION } from '../../../config';

export const getList = `/decor/${API_VERSION}/pageList`;
export const save = `/decor/${API_VERSION}/save`;
export const detail = id => `/decor/${API_VERSION}/detail/${id}`;
