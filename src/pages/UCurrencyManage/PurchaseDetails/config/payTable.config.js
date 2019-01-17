import React from 'react';
import { Badge } from 'antd';
import { moneyToUCurrency } from '@tools';
import { PROJECT_CONFIG } from '@common/config';

const { STORE, ENTERPRISE } = PROJECT_CONFIG;

export default app => {
  return [
    {
      title: '订单编号',
      dataIndex: 'id',
      width: 100,
    },
    {
      title: '订单类型',
      dataIndex: 'payOrderType',
      width: 100,
      render: val => 'U币充值',
    },
    {
      title: '所属装企',
      author: {
        system: [STORE.platform],
      },
      dataIndex: 'companyName',
      width: 150,
    },
    {
      title: '联系人',
      dataIndex: 'storeUsername',
      width: 100,
    },
    {
      title: '联系方式',
      dataIndex: 'storeTel',
      width: 120,
    },
    {
      title: '购买U币',
      dataIndex: 'num',
      sorter: (a, b) => a.num - b.num,
      width: 100,
      render: val => moneyToUCurrency(val, 100),
    },
    {
      title: '支出时间',
      dataIndex: 'orderTime',
      width: 120,
      author: {
        system: [STORE.platform],
      },
    },
    {
      title: '下单时间',
      dataIndex: 'orderTime',
      width: 120,
      author: {
        system: [ENTERPRISE.platform],
      },
    },
  ];
};
