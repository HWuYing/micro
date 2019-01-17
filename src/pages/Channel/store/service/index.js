import { fetch } from '@util';

const { post, get } = fetch;

export const getStoreLowerList = async (body, context) => post('/store/subChannel/list', {
  body,
  context,
});
