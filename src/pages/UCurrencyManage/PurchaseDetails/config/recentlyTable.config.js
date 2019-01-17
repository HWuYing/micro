import React from 'react';
import { Badge } from 'antd';
import { PROJECT_CONFIG } from '@common/config';

const { STORE, ENTERPRISE } = PROJECT_CONFIG;

export default app => {
  const enumStoreType = { 1: '+', 2: '代充', 3: '-', 4: '-' };
  const enumDecrType = { 2: '+', 3: '+', 4: '-' };

  return [
    {
      title: '时间',
      dataIndex: 'orderTime1',
      width: 150,
      render: (val, record) => record.orderTime,
    },
    {
      title: '收入/支出',
      dataIndex: 'num',
      width: 100,
      author: {
        system: [STORE.platform],
      },
      render: (val, record) => {
        return `${enumStoreType[record.type]}${val / 100}`;
      },
    },
    {
      title: '收入/支出',
      dataIndex: 'num',
      width: 100,
      author: {
        system: [ENTERPRISE.platform],
      },
      render: (val, record) => {
        return `${enumDecrType[record.type]}${val / 100}`;
      },
    },
    {
      title: '详细说明',
      dataIndex: 'orderTime',
      width: 120,
      author: {
        system: [STORE.platform],
      },
      render: (val, record) =>
        `${val || ''}  ${record.type === 1 ? '收入' : ''} ${record.type === 2 ? '支出' : ''} ${
          record.type === 2 ? record.companyName : ''
        }${record.num / 100} 个U币`,
    },
    {
      title: '详细说明',
      dataIndex: 'orderTime',
      width: 120,
      author: {
        system: [ENTERPRISE.platform],
      },
      render: (val, record) =>
        `${val || ''} ${record.type === 4 ? '订单号:' + record.id : ''} ${
          record.type === 2 ? '收入' : ''
        } ${record.type === 3 ? '收入' : ''} ${record.type === 3 ? '支出' : ''} ${record.num /
          100} 个U币`,
    },
  ];
};
