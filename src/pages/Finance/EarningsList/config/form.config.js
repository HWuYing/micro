import { EARNINGS_INCOME_TYPE } from '../../enum';

export default () => ({
  col: 2,
  decorator: [{
    label: '相关单号',
    entry: { key: 'input' },
    filedDecorator: { key: 'orderId' },
  }, {
    label: '收益类型',
    entry: {
      key: 'select',
      children: {
        ALL: { label: '全部', value: ''},
        ...EARNINGS_INCOME_TYPE,
      },
    },
    filedDecorator: {
      key: 'incomeType',
      initialValue: '',
    },
  }, {
    label: '收益时间',
    entry: { key: 'dateRange' },
    filedDecorator: { key: 'applyTime' },
  }],
});
