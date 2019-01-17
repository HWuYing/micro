import moment from 'moment';
import { PROJECT_CONFIG } from '@common/config';
import { statusFlagBadge } from '@tools';
import { DISTRIBUTOR_STATUS } from '../../enum';

export default () => [{
  title: '姓名',
  dataIndex: 'name',
  width: 200,
}, {
  title: '登录手机',
  dataIndex: 'phone',
  width: 200,
}, {
  author: PROJECT_CONFIG.ERP.platform,
  title: '所属组织',
  dataIndex: 'companyName',
  width: 160,
}, {
  title: '分销状态',
  author: {
    audit: false,
  },
  dataIndex: 'enableStatus',
  render: val => statusFlagBadge(val),
  width: 140,
}, {
  title: '分销状态',
  dataIndex: 'enableStatus',
  render: val => statusFlagBadge(val),
  width: 140,
}, {
  title: '审核状态',
  dataIndex: 'auditStatus',
  render: val => statusFlagBadge(val, DISTRIBUTOR_STATUS),
  width: 140,
}, {
  title: '注册时间',
  dataIndex: 'createTime',
  render: val => moment(val).format('YYYY-MM-DD HH:mm:ss'),
  width: 260,
}, {
  title: '操作',
  width: 240,
  dataIndex: 'action',
}];
