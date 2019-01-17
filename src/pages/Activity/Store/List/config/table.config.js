import { statusFlagBadge } from '@tools';

export default () => [
  {
    title: '序号',
    dataIndex: 'id',
    width: 180,
  },
  {
    title: '关联门店',
    width: 180,
    dataIndex: 'storeName',
  },
  {
    title: '执行时间',
    dataIndex: 'endTime',
    width: 280,
    render(val, record) {
      return `${record.startTime}-${val}`;
    },
  },
  {
    title: '状态',
    dataIndex: 'statusFlag',
    width: 120,
    render: val => statusFlagBadge(val),
  },
  {
    title: '操作',
    width: 220,
    dataIndex: 'action',
  },
];
