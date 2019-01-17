import { fetch } from '@util';

const { post, get } = fetch;

export const getList = async (body, context) => post('/activity/store/queryList', { context, body });

export const save = async (body, context) => post('/activity/store/save', { context, body });

export const update = async (body, context) => post('/activity/store/update', { context, body });

export const batchDelete = async (body, context) => post('/activity/store/delete', { context, body });

export const batchChangeState = async (body, context) => post('/activity/store/change/state', { context, body });

export const getDetails = async (body, context) => {
  const { id } = body;
  if (!id || id.toString() === '0') return { data: {} };
  return get(`/activity/store/detail/${id}`, { context, body });
};

