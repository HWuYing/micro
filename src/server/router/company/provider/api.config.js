/* eslint-disable no-undef */
import { API_VERSION } from '../../../config';

export const getList = `/provider/${API_VERSION}/pageList`;
export const detail = (id) => `/provider/${API_VERSION}/detail/${id}`;
export const save = `/provider/${API_VERSION}/save`;
export const deleteRole = `/role/${API_VERSION}/delete`;
