import { moneyToYuan } from '@tools';

export default () => [
  {
    title: '订单号',
    dataIndex: 'orderId',
    width: 120,
  },
  {
    title: '订单实付金额',
    dataIndex: 'orderAmount',
    width: 180,
    render: val => moneyToYuan(val),
  },
  {
    title: '付款方式',
    dataIndex: 'paymentType',
    width: 160,
    render: val => (val === 11 ? '微信支付' : '装企代付'),
  },
  {
    title: '订单类型',
    dataIndex: 'orderType',
    width: 120,
    render: val => (val === 1 ? '普通' : val === 2 ? '团购' : '装企集采'),
  },
  {
    title: '待结算佣金',
    dataIndex: 'waitSettlementAmount',
    width: 260,
    render: val => moneyToYuan(val),
  },
  {
    title: '已结算佣金',
    dataIndex: 'settlementAmount',
    width: 260,
    render: val => moneyToYuan(val),
  },
  {
    title: '订单下单时间',
    dataIndex: 'orderTime',
    width: 260,
  },
];
