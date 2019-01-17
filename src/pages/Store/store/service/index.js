import { fetch } from '@util';

const { post, get } = fetch;

export const getList = async (body, context) => post('/store/list', { context, body });

export const save = async (body, context) => post('/store/save', { body, context });

export const deleteStore = async (body, context) => post('/store/delete', { body, context });

export const openDistribute = async (body, context) => post('/company/distribute/open', { body, context });

export const closeDistribute = async (body, context) => post('/company/distribute/close', { body, context });

export const invitationCode = async (body, context) => get('/company/invitationCode', { body, context });

export const getDetail = async (body, context) => {
  const { id } = body;
  if (!id || id.toString() === '0') return { data: {} };
  return get(`/store/detail/${body.id}`, { context });
};

export const getDecorList = async (body, context) => post('/store/subChannel/list', {
  body,
  context,
});
