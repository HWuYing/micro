import { typeToLabel, statusFlagBadge } from '@tools';
import { LEVEL, USER_STATUS } from '../../enum';

export default () => [ {
  title: '门店名称',
  dataIndex: 'shopName',
  width: 150,
}, {
  title: '联系人',
  dataIndex: 'linkMan',
  width: 150,
}, {
  title: '联系手机',
  dataIndex: 'linkTel',
  width: 150,
}, {
  title: '门店等级',
  dataIndex: 'companyLevel',
  width: 150,
  render: (value) => typeToLabel(value, LEVEL),
}, {
  title: '门店所在区域',
  dataIndex: 'linkAddress',
  width: 150,
}, {
  title: '分销二维码',
  dataIndex: 'distributeFlag',
  width: 140,
  render: value => statusFlagBadge(value, {
    'success': { value: 1, label: "启用", status: 'success' },
    'default': { value: 2, label: "禁用", status: 'default' },
  }),
}, {
  title: '状态',
  dataIndex: 'statusFlag',
  width: 150,
  render: (value) => statusFlagBadge(value, USER_STATUS),
}, {
  title: '添加时间',
  width: 150,
  dataIndex: 'updateTime',
}, {
  title: '操作',
  width: 190,
  dataIndex: 'action',
}];
