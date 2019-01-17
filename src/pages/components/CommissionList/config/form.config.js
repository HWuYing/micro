
export default () => ({
  col: 3,
  decorator: [{
    label: '提现单号',
    entry: {
      key: 'input',
      placeholder: '请输入提现单号',
    },
    filedDecorator: { key: 'id' },
  }, {
    label: '申请人',
    entry: {
      key: 'input',
      placeholder: '请输入申请人',
    },
    filedDecorator: { key: 'userName' },
  }, {
    label: '手机号码',
    entry: {
      key: 'input',
      placeholder: '请输入手机号码',
    },
    filedDecorator: { key: 'tel' },
  }, {
    item: {
      label: '申请时间',
      layoutSpan: 16,
    },
    entry: {
      key: 'dateRange',
    },
    filedDecorator: { key: 'applyTime' },
  }],
});
