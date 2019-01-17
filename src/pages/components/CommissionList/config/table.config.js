import { moneyToYuan } from '@tools';

export default () => [{
  title: '提现单号',
  dataIndex: 'id',
  width: 220,
}, {
  title: '提现金额',
  dataIndex: 'amount',
  width: 220,
  render: val => `¥${moneyToYuan(val)}`,
}, {
  title: '申请人',
  dataIndex: 'userName',
  width: 220,
}, {
  title: '申请人电话',
  dataIndex: 'tel',
  width: 220,
}, {
  title: '申请时间',
  dataIndex: 'createTime',
  width: 220,
}, {
  title: '操作',
  dataIndex: 'action',
  width: 220,
}];
