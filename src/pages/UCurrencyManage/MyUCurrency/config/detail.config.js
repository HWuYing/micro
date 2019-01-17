export default (app, rootContext) => {
  const { renderImageCode } = rootContext;

  return [
    {
      col: 1,
      decorator: [
        {
          label: '订单编号',
          entry: {
            key: 'text',
          },
          filedDecorator: {
            key: 'id',
          },
        },
        {
          label: '订单状态',
          entry: {
            key: 'text',
          },
          filedDecorator: {
            key: 'stateName',
          },
        },
        {
          label: '订单类型',
          entry: {
            key: 'text',
          },
          filedDecorator: {
            key: 'orderTypeName',
          },
        },
        {
          label: '支付方式',
          entry: {
            key: 'text',
          },
          filedDecorator: {
            key: 'paymentTypeName',
          },
        },
        {
          label: '购买U币',
          entry: {
            key: 'text',
          },
          filedDecorator: {
            key: 'num',
          },
        },
        {
          label: '应付总额',
          entry: {
            key: 'text',
          },
          filedDecorator: {
            key: 'payableAmount',
          },
        },
        {
          label: '充值方式',
          entry: {
            key: 'text',
          },
          filedDecorator: {
            key: 'typeName',
          },
        },
        {
          label: '扫描二维码付款',
          entry: () => null,
          render: renderImageCode,
        },
      ],
    },
  ];
};
