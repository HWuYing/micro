import { moneyToYuan } from '@tools';

export default () => [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: '登录手机',
    dataIndex: 'phone',
    width: 200,
  },
  {
    title: '消费金额',
    dataIndex: 'consumeAmount',
    width: 200,
    render: val => moneyToYuan(val),
  },
  {
    title: '累计佣金',
    dataIndex: 'commissionAmount',
    width: 200,
    render: val => moneyToYuan(val),
  },
  {
    title: '注册时间',
    dataIndex: 'createTime',
    width: 200,
  },
];
