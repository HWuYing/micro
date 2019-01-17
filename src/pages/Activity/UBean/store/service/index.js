import { fetch } from '@util';

const { post, get } = fetch;

// u豆扫码赠送列表
export const getUBeanScanCodePresentationQueryList = async (body, context) => post('/activity/uBean/scanCodePresentation/pageList', {
  body,
  context,
});

// u豆扫码赠送保存
export const saveUBeanScanCodePresentation = async (body, context) => post('/activity/uBean/scanCodePresentation/save', {
  body,
  context,
});

// u豆扫码赠送删除
export const deleteUBeanScanCodePresentation = async (body, context) => post('/activity/uBean/scanCodePresentation/delete', {
  body,
  context,
});

// u豆扫码赠送二维码打包
export const tarFileScanCodePresentation = async (body, context) => get(`/activity/uBean/scanCodePresentation/tarFile/${body.id}`, {
  body,
  context,
});

// 获取企业列表
export const getCompanyList = async (body, context) => post('/company/pageList', {
  body,
  context,
  isLoading: false,
});
