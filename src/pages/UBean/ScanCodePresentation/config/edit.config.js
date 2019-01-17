import moment from 'moment';

export default () => ({
  col: 1,
  decorator: [{
    label: '绑定相关角色类型',
    entry: {
      key: 'input',
      placeholder: '请输入注册手机',
    },
    filedDecorator: {
      key: 'tel',
      initialValue: '',
    },
  }, {
    label: '查询相关组织角色',
    entry: {
      key: 'input',
      placeholder: '请输入注册手机',
    },
    filedDecorator: {
      key: 'tel',
      initialValue: '',
    },
  }, {
    label: '赠送总笔数',
    entry: {
      key: 'input',
      placeholder: '请输入注册手机',
    },
    filedDecorator: {
      key: 'tel',
      initialValue: '',
    },
  }, {
    label: '每笔总U豆数量',
    entry: {
      key: 'inputNumber',
      min: 0,
      style: { width: '100%' },
      placeholder: '请输入注册手机',
    },
    filedDecorator: {
      key: 'tel',
      initialValue: '',
    },
  }, {
    label: 'U豆领取有效时间',
    entry: {
      key: 'dateRange',
      placeholder: '请输入注册手机',
      showTime: true,
      format: 'YYYY-MM-DD hh:mm:ss',
      ...(() => {
        const date = new Date();
        const minDate = moment(date.setDate(date.getDate() - 1)).endOf('day');
        return {
          disabledStartDate: current => current && current < minDate,
          disabledEndDate: current => current && current < minDate,
        }
      })(),
    },
    filedDecorator: {
      key: 'tel',
    },
  }],
});
