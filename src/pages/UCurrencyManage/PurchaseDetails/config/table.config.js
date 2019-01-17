import React from 'react';
import { Badge } from 'antd';
import { moneyToUCurrency } from '@tools';
import { PROJECT_CONFIG } from '@common/config';
import { STATUA_ENUM, enumStatusList, PAY_TYPE_ENUM } from '../../store/constant/index';

const { STORE, ERP, ENTERPRISE } = PROJECT_CONFIG;

export default app => {
  const { rootContext } = app;

  return [
    {
      title: '订单编号',
      dataIndex: 'id',
      width: 100,
    },
    {
      title: '订单类型',
      dataIndex: 'payOrderType',
      width: 120,
      render: val => 'U币充值',
    },
    {
      title: '所属门店',
      dataIndex: 'storeName',
      author: {
        system: [ERP.platform],
      },
      width: 150,
    },
    {
      title: '充值类型',
      dataIndex: 'type',
      author: {
        system: [STORE.platform],
      },
      width: 150,
      render: (val, record) => (val === 1 ? '自充' : record.companyName),
    },
    {
      title: '购买人',
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
      sorter: (a, b) => a.total - b.total,
      width: 150,
      render: val => moneyToUCurrency(val, 100),
    },
    {
      title: '订单总额',
      dataIndex: 'payableAmount',
      sorter: (a, b) => a.payableAmount - b.payableAmount,
      width: 150,
      render: val => val / 100,
    },
    // {
    //   title: '已付金额',
    //   dataIndex: 'categoryName',
    //   sorter: (a, b) => a.totalAmount - b.totalAmount,
    //   width: 150,
    // },
    {
      title: '支付方式',
      dataIndex: 'paymentType',
      width: 120,
      author: {
        system: [STORE.platform],
      },
      render(value) {
        const item = PAY_TYPE_ENUM[value];
        if (!item) return '--';
        return <Badge status={item.icon} text={item.text} />;
      },
    },
    {
      title: '下单时间',
      dataIndex: 'orderTime',
      width: 150,
      // render: (val, record) => `${record.startTime}-${val}`,
    },
    {
      title: '订单状态',
      dataIndex: 'state',
      width: 120,
      author: {
        system: [STORE.platform],
      },
      filters: enumStatusList,
      filterMultiple: true,
      render(value) {
        const item = STATUA_ENUM[value];
        if (!item) return '--';
        return <Badge status={item.icon} text={item.text} />;
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 100,
      author: {
        '!system': [ENTERPRISE.platform],
      },
      render: rootContext.renderAction,
    },
  ];
};
