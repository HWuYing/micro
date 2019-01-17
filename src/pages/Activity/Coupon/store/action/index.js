import * as service from '../service/index';

const namespace='activity-coupon-manage';

export const GET_ACTIVITY_COUPON_LIST = `${namespace}GET_STORE_LIST`;

export const getList = (body, context) => async dispatch => {
  const { data, total } = await service.getList(body, context);
  dispatch({
    type: GET_ACTIVITY_COUPON_LIST,
    data,
    total,
  });
};

export const save = (body, context) => async () => service.save(body, context);

export const getDetail = (body, context) => async () => service.getDetail(body, context);

export const deleteActivity = (body, context) => async () => service.deleteActivity(body, context);
