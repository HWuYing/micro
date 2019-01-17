
export default () => ({
  decorator: [{
    label: '注册手机',
    entry: {
      key: 'input',
      placeholder: '请输入注册手机',
    },
    filedDecorator: {
      key: 'tel',
      initialValue: '',
    },
  }],
});
