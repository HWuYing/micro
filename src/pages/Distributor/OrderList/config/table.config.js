import moment from 'moment';
import { typeToLabel } from '@tools';
import { DISTRIBUTOR_ORDER_STATUS } from '../../enum';

export default () => [{
  title: '订单编号',
  dataIndex: 'orderId',
  width: 240,
}, {
  title: '订单实付金额',
  dataIndex: 'orderAmount',
  width: 200,
  render: val => val ? Number(val) / 100 : '--',
}, {
  title: '待结算佣金',
  dataIndex: 'waitSettlementAmount',
  width: 200,
  render: val => val ? Number(val) / 100 : '--',
}, {
  title: '已结算佣金',
  dataIndex: 'settlementAmount',
  width: 200,
  render: val => val ? Number(val) / 100 : '--',
}, {
  title: '结算状态',
  dataIndex: 'status',
  width: 120,
  render: val => typeToLabel(val, DISTRIBUTOR_ORDER_STATUS),
}, {
  title: '订单下单时间',
  dataIndex: 'orderTime',
  width: 220,
  render: val => (val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '--'),
}];
