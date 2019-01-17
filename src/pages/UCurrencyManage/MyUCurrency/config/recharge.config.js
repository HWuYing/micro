import * as rexRules from '@tools';

export default (app, rootContext) => {
  const { renderUcurrency } = rootContext;

  return [
    {
      col: 1,
      decorator: [
        {
          label: '充值装企',
          entry: {
            key: 'text',
          },
          filedDecorator: {
            key: 'name',
          },
        },
        {
          label: '装企负责人',
          entry: {
            key: 'text',
          },
          filedDecorator: {
            key: 'linkMan',
          },
        },
        {
          label: '负责人电话',
          entry: {
            key: 'text',
          },
          filedDecorator: {
            key: 'linkTel',
          },
        },
        {
          entry: () => null,
          render: renderUcurrency,
        },
      ],
    },
  ];
};
