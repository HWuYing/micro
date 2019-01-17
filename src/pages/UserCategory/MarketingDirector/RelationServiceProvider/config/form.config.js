
export default () => ({

  decorator: [{
    item: {
      labelStyle: { width: 0 },
    },
    entry: {
      col: 3,
      key: 'moreEntry',
      childrenEntry: [ {
        layoutSpan: 4,
        entry: {
          key: 'text',
          target: 'span',
          children: '营销总监',
        },
      }, {
        layoutSpan: 17,
        entry: {
          key: 'slider',
          min: 0,
          max: 100,
          marks: {0: '0%', 50: '50%', 100: '100%'},
          tipFormatter: val => `${val}%`,
          tooltipVisible: true,
        },
        filedDecorator: {
          key: 'districtRate',
          initialValue: '',
        },
      },{
        layoutSpan: 3,
        entry: {
          key: 'text',
          target: 'span',
          children: '服务商',
        },
      }],
    },
  }],
});
