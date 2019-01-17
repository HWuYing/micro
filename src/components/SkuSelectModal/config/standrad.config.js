import React from 'react';
import GoodsCard from '@components/GoodsCard';

const formConfig = () => {
  return [{
    item: {
      label: '商品类目',
    },
    entry: {
      key: 'goodsCategoryThree',
      labelName: 'name',
      valueName: 'id',
      children: [],
    },
    filedDecorator: {
      key: 'categoryId',
    },
  }, {
    label: '商品名称',
    entry: {
      key: 'input',
      placeholder: '请输入商品名称',
    },
    filedDecorator: {
      key: 'name',
    },
  }];
};

const tableConfig = () => {
  return [
    {
      title: '商品信息',
      dataIndex: 'name',
      width: 220,
      render: (val, record) => (
        <GoodsCard
          image={(record.image || '').split(',')[0]}
          name={val}
          cardStyle="listCard"
        />
      ),
    },
    {
      title: '商品品类',
      dataIndex: 'categoryName',
      width: 120,
    },
    {
      title: '商品品牌',
      dataIndex: 'brandName',
      width: 120,
    },
    {
      title: '商品零售价',
      dataIndex: 'retailPrice',
      width: 160,
      render: value => value ? Number(value / 100) : '--',
    },
    {
      title: '商品规格',
      dataIndex: 'specProps',
      width: 160,
      render: (val) => {
        if (!val) return '--';
        return val.reduce((arr, item) => {
          arr.push(`${item.propName}:${item.value}`);
          return arr;
        }, []).join(';');
      },
    },
  ];
};

export {
  formConfig,
  tableConfig,
};
