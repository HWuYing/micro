import moment from 'moment';
import { PROJECT_CONFIG } from '@common/config';
import { statusFlagBadge, typeToLabel } from '@tools';
import { DISTRIBUTOR_TYPE } from '../../enum';

export default () => [ {
  title: '姓名',
  dataIndex: 'name',
  width: 120,
}, {
  title: '登录手机',
  dataIndex: 'phone',
  width: 120,
}, {
  title: '用户类型',
  dataIndex: 'type',
  width: 120,
  render: val => typeToLabel(val, DISTRIBUTOR_TYPE),
}, {
  title: '消费金额',
  dataIndex: 'consumeAmount',
  width: 200,
  render: val => val ? Number(val) / 100 : '--',
}, {
  title: '累计佣金',
  dataIndex: 'commissionAmount',
  width: 200,
  render: val => val ? Number(val) / 100 : '--',
}, {
  title: '注册时间',
  dataIndex: 'createTime',
  width: 220,
  render: val => moment(val).format('YYYY-MM-DD HH:mm:ss'),
}];
