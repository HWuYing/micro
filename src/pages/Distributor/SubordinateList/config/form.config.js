export default () => ({
  decorator: [{
    item: {
      label: '姓名',
    },
    entry: {
      key: 'input',
      placeholder: '请输入姓名',
    },
    filedDecorator: {
      key: 'name',
    },
  }, {
    item: {
      label: '登录手机',
    },
    entry: {
      key: 'input',
      placeholder: '请输入登录手机',
    },
    filedDecorator: {
      key: 'phone',
    },
  }],
});
