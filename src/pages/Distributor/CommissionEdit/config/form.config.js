export default () => ({
  decorator: [
    {
      label: '申请人',
      entry: { key: 'text' },
      filedDecorator: { key: 'applyName' },
    },
    {
      label: '联系电话',
      entry: { key: 'text' },
      filedDecorator: { key: 'phone' },
    },
    {
      label: '申请时间',
      entry: { key: 'text' },
      filedDecorator: { key: 'applyTime' },
    },
    {
      label: '开户行',
      entry: { key: 'text' },
      filedDecorator: { key: 'bankName' },
    },
    {
      label: '开户账号',
      entry: { key: 'text' },
      filedDecorator: { key: 'bankCardholder' },
    },
    {
      label: '开户卡号',
      entry: { key: 'text' },
      filedDecorator: { key: 'bankAccount' },
    },
  ],
});
