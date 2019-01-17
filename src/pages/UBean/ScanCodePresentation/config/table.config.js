import moment from 'moment';
import { statusFlagBadge, typeToLabel } from '@tools';

export default () => [{
  title: '绑定角色',
  dataIndex: 'companyName',
  width: 200,
}, {
  title: '总条数',
  dataIndex: 'totalCount',
  width: 120,
}, {
  title: '单笔领取数',
  dataIndex: 'unitCoinCount',
  width: 120,
}, {
  title: '已领取笔数',
  dataIndex: 'nickName',
  width: 120,
}, {
  title: '活动状态',
  dataIndex: 'status',
  width: 120,
  render: val => statusFlagBadge(val),
}, {
  title: '添加时间',
  dataIndex: 'updateTime',
  width: 240,
  render: val => val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '--',
}, {
  title: '有效时间范围',
  dataIndex: 'updateTime',
  width: 240,
  render: val => val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '--',
}, {
  title: '操作',
  width: 190,
  dataIndex: 'action',
}];
