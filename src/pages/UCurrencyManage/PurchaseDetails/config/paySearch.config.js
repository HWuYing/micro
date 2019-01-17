import { PROJECT_CONFIG } from '@common/config';

const { STORE, ENTERPRISE } = PROJECT_CONFIG;

export default [
  {
    col: 3,
    decorator: [
      {
        item: {
          label: '订单编号',
        },
        entry: {
          key: 'input',
          placeholder: '请输入',
        },
        filedDecorator: {
          key: 'id',
        },
      },
      {
        label: '所属装企',
        author: {
          system: [STORE.platform],
        },
        entry: {
          key: 'input',
          placeholder: '请输入',
        },
        filedDecorator: {
          key: 'companyName',
          rules: [],
        },
      },
      {
        item: {
          label: '联系人',
        },
        author: {
          system: [STORE.platform],
        },
        entry: {
          key: 'input',
          placeholder: '请输入',
        },
        filedDecorator: {
          key: 'storeUsername',
        },
      },
      {
        item: {
          label: '联系方式',
        },
        author: {
          system: [STORE.platform],
        },
        entry: {
          key: 'input',
          placeholder: '请输入',
        },
        filedDecorator: {
          key: 'storeTel',
        },
      },
      {
        label: '下单日期',
        entry: {
          key: 'dateRange',
          // showTime: true,
          // format: 'YYYY-MM-DD HH:mm:ss',
        },
        filedDecorator: {
          key: 'time',
          rules: [],
        },
      },
    ],
  },
];
