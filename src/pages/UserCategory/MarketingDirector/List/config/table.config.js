import moment from 'moment';
import { statusFlagBadge, typeToLabel } from '@tools';

export default () => [{
  title: '注册手机',
  dataIndex: 'tel',
  width: 200,
}, {
  title: '姓名',
  dataIndex: 'nickName',
  width: 120,
}, {
  title: '添加时间',
  dataIndex: 'updateTime',
  width: 240,
  render: val => val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '--',
}, {
  title: '操作',
  width: 190,
  dataIndex: 'action',
}];
