import * as service from '../service/index';

const namespace='micro-u-bean-manage';

export const GET_U_BEAN_SCAN_CODE_PRESENTATION_QUERY_LIST = `${namespace}GET_U_BEAN_SCAN_CODE_PRESENTATION_QUERY_LIST`;

export const getUBeanScanCodePresentationQueryList = (body, context) => async dispatch => {
  const { data, total } = await service.getUBeanScanCodePresentationQueryList(body, context);
  dispatch({
    type: GET_U_BEAN_SCAN_CODE_PRESENTATION_QUERY_LIST,
    data,
    total,
  });
};

export const saveUBeanScanCodePresentation = (body, context) => async () => service.saveUBeanScanCodePresentation(body, context);

export const deleteUBeanScanCodePresentation = (body, context) => async () => service.deleteUBeanScanCodePresentation(body, context);

export const tarFileScanCodePresentation = (body, context) => async () => service.tarFileScanCodePresentation(body, context);

export const getCompanyList = (body, context) => async () => service.getCompanyList(body, context);
