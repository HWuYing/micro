import React from 'react';
import { typeToLabel } from '@tools';
import { COUPON_TYPE } from '../../enum';

export default () => [
  {
    title: '优惠券名称',
    dataIndex: 'name',
    width: 140,
  },
  {
    title: '优惠方式',
    dataIndex: 'preferentialWay',
    width: 140,
    render: val => typeToLabel(val, COUPON_TYPE),
  },
  {
    title: '有效日期',
    dataIndex: 'endTime',
    width: 320,
    render(value, record) {
      const { validityTimeType = 1, expireDate } = record;
      if (validityTimeType.toString() === '1') {
        return `${record.startTime} 至 ${value}`;
      } else {
        return `领取后${expireDate}天`;
      }
    },
  },
  {
    title: '优惠券配图',
    dataIndex: 'banner',
    width: 180,
    render: val => {
      return (
        /* eslint-disable */
        <img style={{ width: '100px', height: '100px' }} src={val} alt="配图" />
      );
    },
  },
  {
    title: '领取统计',
    dataIndex: 'checkCount',
    width: 140,
  },
  {
    title: '添加时间',
    dataIndex: 'updateTime',
    width: 200,
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 180,
  },
]
