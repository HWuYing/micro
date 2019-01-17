// 收益结算状态
export const EARNINGS_SETTLEMENT = {
  ALREADY: { label: '已结算', value: 21 },
  NOT_HAVE: { label: '待结算', value: 11 },
  INVALID: { label: '失效', value: 31 },
};

// 收益类型
export const EARNINGS_INCOME_TYPE = {
  PUSHING_HANDS: { label: '创客', value: 1 },
  ENTERPRISE: { label: '装企', value: 11 },
  STORE: { label: '门店', value: 12 },
  PUSHING_HANDS_REWARD: { label: '创客奖励', value: 31 },
  SERVICE_REWARD: { label: '服务商奖励', value: 32 },
};

// 佣金状态
// export const COMMISSION_STATUS = {
//   SUCCESS: { label: '成功提现', value: '21' },
//   ADOPT: { label: '正在提现', value: '12' },
//   WAIT: { label: '等待审核', value: '11' },
//   REFUSE: { label: '通过审核', value: '31' },
// };

// 佣金审核 接口状态
export const COMMISSION_AUDIT_STATUS = {
  ADOPT: { label: '审核成功', value: '1' },
  REFUSE: { label: '审核失败', value: '2' },
};


// 佣金状态
export const COMMISSION_STATUS = {
  SUCCESS: { label: '成功提现', value: '10' },
  ADOPT: { label: '正在提现', value: '2' },
  WAIT: { label: '等待审核', value: '1' },
  AUDIT_FAIL: { label: '审核失败', value: '11' },
  REFUSE: { label: '提现失败', value: '12' },
};

// 订单类型
export const ORDER_TYPE = {
  COMMON: { label: '普通订单', value: 1 },
  GROUP: { label: '团购订单', value: 2 },
  DECOR_PURCHASE: { label: '装企集采订单', value: 11 },
};

// 支付类型
export const PAYMENT_TYPE = {
  UNKNOWN: { label: '未知类型', value: 0 },
  ONLINE_WEIXIN: { label: '微信支付', value: 11 },
  OFFLINE_DECOR: { label: '装企支付', value: 21 },
  STORE_DECOR: { label: '门店代付', value: 22 },
};

export const IS_MARKETING_DIRECTOR = {
  YES: { value: '1', label: '是' },
  NO: { value: '2', label: '否' },
};
