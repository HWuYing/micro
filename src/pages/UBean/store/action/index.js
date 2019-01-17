import * as service from '../service/index';

const namespace='micro-u-bean-manage';

export const GET_U_BEAN_SCAN_CODE_PRESENTATION_QUERY_LIST = `${namespace}GET_U_BEAN_SCAN_CODE_PRESENTATION_QUERY_LIST`;

export const getUBeanScanCodePresentationQueryList = (body, context) => async dispatch => {
  const { ...reset } = body;
  const { data, total } = await service.getUBeanScanCodePresentationQueryList(reset, context);
  dispatch({
    type: GET_U_BEAN_SCAN_CODE_PRESENTATION_QUERY_LIST,
    data,
    total,
  });
};
