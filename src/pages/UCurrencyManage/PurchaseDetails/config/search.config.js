import { PROJECT_CONFIG } from '@common/config';

const { ERP } = PROJECT_CONFIG;

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
        item: {
          label: '订单联系人',
        },
        author: {
          system: [ERP.platform],
        },
        entry: {
          key: 'input',
          placeholder: '请输入',
        },
        filedDecorator: {
          key: 'username',
        },
      },
      {
        item: {
          label: '联系电话',
        },
        author: {
          system: [ERP.platform],
        },
        entry: {
          key: 'input',
          placeholder: '请输入',
        },
        filedDecorator: {
          key: 'tel',
        },
      },
      {
        item: {
          label: '门店名称',
        },
        author: {
          system: [ERP.platform],
        },
        entry: {
          key: 'connectSelect',
          showSearch: true,
          labelName: 'name',
          valueName: 'id',
          placeholder: '请输入',
          serviceApi: 'queryStoreList',
          storeKey: 'storeListEnum',
          mappingTo: 'children',
          filterOption: (input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
        },
        filedDecorator: {
          key: 'name',
        },
      },
      // {
      //   label: '所属城市',
      //   author: {
      //     system: [ERP.platform],
      //   },
      //   entry: {
      //     key: 'connectCascader',
      //     titleName: 'name',
      //     valueName: 'id',
      //     serviceApi: 'queryRegion',
      //     storeKey: 'regionData',
      //     mappingTo: 'children',
      //   },
      //   filedDecorator: {
      //     key: 'location',
      //   },
      // },
      // {
      //   label: '支付方式',
      //   entry: {
      //     key: 'select',
      //     labelName: 'text',
      //     children: payTypeList,

      //   },
      //   filedDecorator: {
      //     key: 'stateList',
      //   },
      // },
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
