import { LEVEL, USER_STATUS } from '../../enum';

export default () => ({
  decorator: [{
    item: {
      label: '门店名称',
    },
    entry: {
      key: 'input',
      placeholder: '输入门店名称',
    },
    filedDecorator: {
      key: 'shopName',
    },
  }, {
    label: '用户状态',
    entry: {
      key: 'select',
      placeholder: '选择用户状态',
      children: {
        'ALL': { label: '全部', value: ''},
      },
    },
    filedDecorator: {
      key: 'statusFlag',
      initialValue: '',
    },
  }],
});
