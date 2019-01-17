export const STATUA_ENUM = {
  11: {
    text: '待支付',
    label: '待支付',
    value: 11,
    icon: 'default',
  },
  21: {
    text: '已完成',
    label: '已完成',
    value: 21,
    icon: 'warnning',
  },
  32: {
    text: '已取消',
    label: '已取消',
    value: 32,
    icon: 'error',
  },
  2: {
    text: '全部',
    label: '全部',
    value: '',
    icon: '',
  },
};

export const enumStatusList = Object.values(STATUA_ENUM);

export const PAY_TYPE_ENUM = {
  12: {
    text: 'POS机支付',
    value: 12,
    icon: 'default',
  },
};

export const payTypeList = Object.values(PAY_TYPE_ENUM);

export const RECHARGE_TYPE_ENUM = {
  1: {
    text: '门店自充',
    value: 1,
    icon: 'default',
  },
  2: {
    text: '装企代充',
    value: 2,
    icon: 'success',
  },
  3: {
    text: '转账',
    value: 3,
    icon: 'warnning',
  },
};

export const rechargeList = Object.values(RECHARGE_TYPE_ENUM);
