import * as rexRules from '@tools';

export default (app, rootContext) => {
  const { renderUcurrency, renderDecr } = rootContext;

  return [
    {
      col: 1,
      decorator: [
        {
          label: '当前剩余U币数',
          entry: {
            key: 'text',
          },
          filedDecorator: {
            key: 'oldNum',
          },
        },
        {
          entry: () => null,
          render: renderUcurrency,
        },
        {
          label: '充值类型',
          entry: {
            key: 'radioGroup',
            children: [{ label: '自充', value: '1' }, { label: '给装企充', value: '2' }],
          },
          filedDecorator: {
            key: 'type',
            rules: [rexRules.inputRequired],
          },
        },
        {
          entry: () => null,
          render: renderDecr,
        },
        {
          label: '支付方式',
          entry: {
            key: 'radioGroup',
            children: [{ label: 'POS机充值', value: '12' }],
          },
          filedDecorator: {
            key: 'paymentType',
            rules: [rexRules.inputRequired],
          },
        },
        // {
        //   label: '绑定卡号',
        //   entry: {
        //     key: 'text',
        //   },
        //   filedDecorator: {
        //     key: 'userName',
        //   },
        // },
        // {
        //   label: '绑定电话',
        //   entry: {
        //     key: 'text',
        //   },
        //   filedDecorator: {
        //     key: 'userName',
        //   },
        // },
        // {
        //   label: '输入验证码',
        //   entry: {
        //     key: 'input',
        //   },
        //   filedDecorator: {
        //     key: 'userName',
        //   },
        //   render: renderSaleMoney,
        // },
      ],
    },
  ];
};
