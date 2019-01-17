import * as rexRules from '@tools';

export default ({ rootContext }) => {
  const { renderEllInput } = rootContext;
  return [{
      title: '分配链路情况',
      dataIndex: 'key1',
  }, {
    title: '靠近消费者端创客',
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
  }, {
    title: '次级创客',
    dataIndex: 'proportion2',
    width: '120',
    props: (children, record, index, text) => {
      if (index !== 0) return renderEllInput(children);
      return text;
    },
    decorator: {
      entry: {
        key: 'input',
      },
      filedDecorator: {
        rules: [rexRules.inputRequired, rexRules.minZoreToMaxOneHundred],
      },
    },
  }, {
    title: '次次级创客',
    dataIndex: 'proportion3',
    width: '120',
    props: (children, record, index, text) => {
      if (index === 2) return renderEllInput(children);
      return text;
    },
    decorator: {
      entry: {
        key: 'input',
      },
      filedDecorator: {
        rules: [rexRules.inputRequired, rexRules.minZoreToMaxOneHundred],
      },
    },
  }];
};
