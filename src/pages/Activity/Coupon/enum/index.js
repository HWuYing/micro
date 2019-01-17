// 优惠方式
export const COUPON_TYPE = {
  DISCOUNT: { value: '1', label: '折扣' },
  REDUCTION: { value: '2', label: '减免' },
};

// 使用条件
export const USE_CONDITION = {
  AMOUNT_FORCE: { label: '有效金额', value: '1'},
  PAY_AMOUNT: { label: '实付金额', value: '2'},
};

// 有效时间
export const USEFUL_TIME = {
  BY_INTERVAL: { label: '按区间计算', value: '1'},
  BY_RECEIVE: { label: '按领取时间计算', value: '2'},
};

// 与其他优惠叠加
export const PREFERENTIAL_OVERLAY = {
  NO: { label: '不与其他优惠重叠', value: '1'},
  YES: { label: '可以与其他优惠重叠', value: '2'},
};

// 参与方式
export const PARTAKE_TYPE = {
  BY_CATEGORY: { label: '按品类', value: '1'},
  BY_BRAND: { label: '按品牌', value: '2'},
  BY_GOODS: { label: '部分商品参加', value: '3'},
};
