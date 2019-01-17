import { moneyToYuan } from '@tools';

export default () => [
  {
    title: '商品信息',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: '万千商城零售价',
    dataIndex: 'retailPrice',
    render: val => moneyToYuan(val),
    width: 200,
  },
  {
    title: '编辑',
    dataIndex: 'action',
    width: 150,
  },
]
