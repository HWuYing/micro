import { API_VERSION } from '../../../config';

export const getList = `/coinGive/${API_VERSION}/queryPage`;
export const saveCoinGive = `/coinGive/${API_VERSION}/save`;
export const deleteCoinGive = `/coinGive/${API_VERSION}/delete`;
// 打包文件
export const tarFileCoinGive = id => `/coinGive/${API_VERSION}/tarFile/${id}`;
