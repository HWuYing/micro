export default () => {
  return [
    {
      col: 1,
      decorator: [
        {
          entry: {
            key: 'cardStyle',
            title: '订单基本信息',
          },
        },
      ],
    },
    {
      col: 3,
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
          label: '下单时间',
          entry: {
            key: 'text',
          },
          filedDecorator: {
            key: 'orderTime',
          },
        },
        {
          label: '付款时间',
          entry: {
            key: 'text',
          },
          filedDecorator: {
            key: 'paymentTime',
          },
        },
        {
          label: '所属门店',
          entry: {
            key: 'text',
          },
          filedDecorator: {
            key: 'name',
          },
        },
      ],
    },
    {
      col: 1,
      decorator: [
        {
          entry: {
            key: 'cardStyle',
            title: '购买商品信息',
          },
        },
      ],
    },
    {
      col: 2,
      decorator: [
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
          label: '订单总额',
          entry: {
            key: 'text',
          },
          filedDecorator: {
            key: 'payableAmount',
          },
        },
      ],
    },
    {
      col: 1,
      decorator: [
        {
          entry: {
            key: 'cardStyle',
            title: '购买人信息',
          },
        },
      ],
    },
    {
      col: 2,
      decorator: [
        {
          label: '购买姓名',
          entry: {
            key: 'text',
          },
          filedDecorator: {
            key: 'username',
          },
        },
        {
          label: '购买电话',
          entry: {
            key: 'text',
          },
          filedDecorator: {
            key: 'tel',
          },
        },
      ],
    },
  ];
};
