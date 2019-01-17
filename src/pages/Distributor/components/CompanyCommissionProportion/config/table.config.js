import * as rexRules from '@tools';

export default ({ rootContext }) => {
  const { renderEllInput } = rootContext;
  return [
    {
      title: '分配链路情况',
      dataIndex: 'key1',
    },
    {
      title: '靠近消费者创客',
      dataIndex: 'proportion1',
      width: '120',
      props: renderEllInput,
      decorator: {
        entry: {
          key: 'input',
        },
        filedDecorator: {
          rules: [rexRules.inputRequired, rexRules.minZoreToMaxOneHundred],
        },
      },
    },
  ];;
};
