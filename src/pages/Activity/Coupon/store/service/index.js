import { fetch } from '@util';

const { post, get } = fetch;

export const getList = async (body, context) => post('/activity/coupon/pageList', { context, body });

export const save = async (body, context) => post('/activity/coupon/save', { body, context });

export const deleteActivity = async (body, context) => post('/activity/coupon/delete', { body, context });


export const getDetail = async (body, context) => {
  const { id } = body;
  if (!id || id.toString() === '0') return { data: {} };
  return get(`/activity/coupon/detail/${body.id}`, { context });
};
