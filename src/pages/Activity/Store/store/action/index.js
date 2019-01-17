import * as service from '../service/index';

const namespace='activity-store-manage';

export const GET_STORE_LIST = `${namespace}GET_STORE_LIST`;

export const getList = (body, context) => async dispatch => {
  const { data, total } = await service.getList(body, context);
  dispatch({
    type: GET_STORE_LIST,
    data,
    total,
  });
};

export const getDetails = (body, context) => async () => service.getDetails(body, context);

export const batchDelete = (body, context) => async () => service.batchDelete(body, context);

export const batchChangeState = (body, context) => async () => service.batchChangeState(body, context);

export const save = (body, context) => async () => service.save(body, context);

export const update = (body, context) => async () => service.update(body, context);
