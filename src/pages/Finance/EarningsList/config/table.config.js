import { typeToLabel } from '@tools';
import moment from 'moment';
import { EARNINGS_INCOME_TYPE } from '../../enum';

export default () => [{
  title: '相关单号',
  dataIndex: 'orderId',
  width: 220,
}, {
  title: '收益金额',
  dataIndex: 'incomeAmount',
  width: 220,
  render: val => val ? Number(val) / 100 : '--',
}, {
  title: '订单总额',
  dataIndex: 'orderAmount',
  width: 220,
  render: val => val ? Number(val) / 100 : '--',
}, {
  title: '收益类型',
  dataIndex: 'incomeType',
  render:val => typeToLabel(val, EARNINGS_INCOME_TYPE),
  width: 220,
}, {
  title: '下单时间',
  dataIndex: 'orderTime',
  width: 220,
}, {
  title: '操作',
  dataIndex: 'action',
  width: 220,
}];
