import { PROJECT_CONFIG, PAGE_EDIT_TYPE } from '@common/config';

export default () => ({
  col: 2,
  decorator: [{
    item: {
      label: '相关订单',
    },
    entry: {
      key: 'text',
    },
    filedDecorator: {
      key: 'orderId',
    },
  }, {
    label: '支付方式',
    entry: {
      key: 'text',
    },
    filedDecorator: {
      key: 'paymentType',
    },
  }, {
    label: '订单类型',
    entry: {
      key: 'text',
    },
    filedDecorator: {
      key: 'orderType',
    },
  }, {
    label: '收益类型',
    entry: {
      key: 'text',
    },
    filedDecorator: {
      key: 'incomeType',
    },
  }, {
    label: '订单收益',
    entry: {
      key: 'text',
    },
    filedDecorator: {
      key: 'incomeAmount',
    },
  }, {
    label: '实付金额',
    entry: {
      key: 'text',
    },
    filedDecorator: {
      key: 'orderAmount',
    },
  }],
});
