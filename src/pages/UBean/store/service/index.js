import { fetch } from '@util';

const { post, get } = fetch;

// u豆扫码赠送列表
export const getUBeanScanCodePresentationQueryList = async (body, context) => post('/uBean/scanCodePresentation/queryList', {
  body,
  context,
});

