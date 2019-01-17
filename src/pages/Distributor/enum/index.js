// 创客账号状态
export const DISTRIBUTOR_STATUS = {
  WAIT_AUDIT:{ index: 0, value: '11', label: '待审核', status: 'default' },
  THROUGH_AUDIT: { index: 1, value: '21', label: '审核通过', status: 'success' },
  FAILURE_AUDIT:{ index: 2, value: '31', label: '审核失败', status: 'default' },
};

// 经销商的类型
export const DISTRIBUTOR_TYPE = {
  DISTRIBUTOR: { value: '1', label: '创客' },
  SUBSCRIBER: { value: '11', label: '普通用户' },
};

// 经销商订单结算状态
export const DISTRIBUTOR_ORDER_STATUS = {
  WAIT_SETTLEMENT: { value: '11', label: '待结算' },
  ALREADY_SETTLEMENT: { value: '21', label: '已结算' },
  ABNORMAL: { value: '31', label: '异常订单' },
};

// 行业类型
export const OCCUPATION = {
  COMPUTER: { value: '1', label: '计算机/互联网/通讯' },
  PRODUCTION: { value: '2', label: '生产/工艺/制造' },
  MEDICAL_CARE: { value: '3', label: '医疗/护理/制药' },
  BUSINESS: { value: '4', label: '商业/服务业/个体经营' },
  CULTURE: { value: '5', label: '文化/广告/传媒' },
  ENTERTAINMENT: { value: '6', label: '娱乐/艺术/表演' },
  LAWYER: { value: '7', label: '律师/法务' },
  EDUCATION: { value: '8', label: '教育/培训' },
  CIVIL_SERVANT: { value: '9', label: '公务员/行政/事业单位' },
  AIRLINE_STEWARDESS: { value: '10', label: '模特/空姐' },
  STUDENT: { value: '11', label: '学生' },
  OTHER: { value: '12', label: '其他' },
};

// 佣金状态
export const COMMISSION_STATUS = {
  SUCCESS: { label: '成功提现', value: '21' },
  WAIT: { label: '等待审核', value: '11' },
  ADOPT: { label: '正在提现', value: '12' },
  REFUSE: { label: '审核失败', value: '31' },
};
