import { DISTRIBUTOR_ORDER_STATUS } from '../../enum';

export default () => ({
  decorator: [{
    item: {
      label: '订单编号',
    },
    entry: {
      key: 'input',
      placeholder: '请输入订单编号',
    },
    filedDecorator: {
      key: 'orderId',
    },
  }, {
    item: {
      label: '结算状态',
    },
    entry: {
      key: 'select',
      children: { ...DISTRIBUTOR_ORDER_STATUS },
      placeholder: '请选择结算状态',
    },
    filedDecorator: {
      key: 'phone',
    },
  }],
});
