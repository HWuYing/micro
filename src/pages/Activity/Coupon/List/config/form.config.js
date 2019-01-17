import { COUPON_TYPE } from '../../enum';

export default () => ({
  decorator: [{
    label: '优惠方式',
    entry: {
      key: 'select',
      children: {
        All: { label: '全部', value: '' },
        ...COUPON_TYPE,
      },
    },
    filedDecorator: {
      key: 'preferentialWay',
      initialValue: '',
    },
  },
    {
      item: {
        label: '优惠券名称',
        labelStyle: { width: '110px' },
      },
      entry: { key: 'input' },
      filedDecorator: { key: 'name' },
    },],
});
