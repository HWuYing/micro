export default () => ({
  decorator: [{
    label: '企业名称',
    entry: {
      key: 'input',
      placeholder: '请输入企业名称',
    },
    filedDecorator: {
      key: 'name',
      initialValue: '',
    },
  }, {
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
