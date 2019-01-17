import moment from 'moment';
import { PROJECT_CONFIG } from '@common/config';
import { statusFlagBadge, typeToLabel } from '@tools';
import { COMPANY_LEVEL } from '../../enum';

export default () => [ {
  title: '企业名称',
  dataIndex: 'name',
  width: 200,
}, {
  author: { companyType: PROJECT_CONFIG.ENTERPRISE.value },
  title: '联系人',
  dataIndex: 'linkMan',
  width: 200,
}, {
  author: { companyType: PROJECT_CONFIG.ENTERPRISE.value },
  title: '联系手机',
  dataIndex: 'linkTel',
  width: 160,
}, {
  title: '装企等级',
  author: { companyType: PROJECT_CONFIG.ENTERPRISE.value },
  dataIndex: 'companyLevel',
  width: 140,
  render: val => typeToLabel(val, COMPANY_LEVEL),
}, {
  title: '挂靠门店',
  dataIndex: 'storeName',
  width: 260,
}, {
  title: '分销二维码',
  dataIndex: 'distributeFlag',
  width: 180,
  render: value => statusFlagBadge(value, {
    'success': { value: 1, label: "启用", status: 'success' },
    'default': { value: 2, label: "禁用", status: 'default' },
  }),
}, {
  title: '用户状态',
  dataIndex: 'accountStatusFlag',
  width: 120,
  render: val => statusFlagBadge(val),
}, {
  title: '添加时间',
  dataIndex: 'updateTime',
  width: 240,
  render: val => val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '--',
}, {
  title: '操作',
  width: 240,
  dataIndex: 'action',
}];
