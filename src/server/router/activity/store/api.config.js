/* eslint-disable no-undef */
import { API_VERSION } from '../../../config';

// 门店活动列表
export const getList = `/storeActivity/${API_VERSION}/queryPage`;
// 门店活动详情
export const getDetail = id => `storeActivity/${API_VERSION}/detail/${id}`;
// 门店活动删除
export const batchDelete = (list) =>  `storeActivity/${API_VERSION}/batchDelete/${list.join(',')}`;
// 门店活动保存
export const save = `/storeActivity/${API_VERSION}/save`;
// 门店活动开启，关闭
export const batchChangeState = (list, state) => `storeActivity/${API_VERSION}/batchUpdateState/${list.join(',')}/${state}`;
// 门店活动修改
export const update = `/storeActivity/${API_VERSION}/update`;
