import { statusFlagBadge, typeToLabel } from '@tools';
import { DECOR_LEVEL } from '../../enum';

export default () => [
  {
    title: '企业名称',
    dataIndex: 'name',
    width: 230,
  },
  {
    title: '联系人',
    dataIndex: 'linkMan',
    width: 150,
  },
  {
    title: '联系手机',
    dataIndex: 'linkTel',
    width: 230,
  },
  {
    title: '装企等级',
    dataIndex: 'companyLevel',
    width: 150,
    render: val => typeToLabel(val, DECOR_LEVEL),
  },
  {
    title: '状态',
    dataIndex: 'accountStatusFlag',
    width: 150,
    render: val => statusFlagBadge(val),
  },
  {
    title: '操作时间',
    dataIndex: 'updateTime',
    width: 200,
  },
];
