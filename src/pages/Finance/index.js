import { RoutePath } from '@applyComponent';
import { component } from '@particulate';
import { COMMISSION_STATUS } from './enum';
import EarningsList from './EarningsList/container';
import EarningsInfo from './EarningsInfo/container';
import ApplyCommissionExtract from './ApplyCommissionExtract/container';
import ApplyPutForward from './ApplyPutForward/container';

const { cloneElement } = component;

// 企业收益列表
const CompanyEarningsListRoute = RoutePath('/finance-manage/revenue/list')(EarningsList);
// 企业收益详情
const CompanyEarningsInfoRoute = RoutePath('/finance-manage/revenue/info/:id')(EarningsInfo);

// 平台 佣金提现 审核
const ErpApplyCommissionExtractRoute = RoutePath('/finance-manage/audit/commission')(cloneElement(ApplyCommissionExtract, {
  COMMISSION_STATUS,
}));
// 企业/门店 发起佣金提现 （包含list）
const ApplyCommissionExtractRoute = RoutePath('/finance-manage/apply/commission')(cloneElement(ApplyCommissionExtract, {
  COMMISSION_STATUS,
}));
// 营销总监 发起佣金提现 （包含list）
const ApplyCommissionMarketingDirectorExtractRoute = RoutePath('/finance-marketing-manage/apply/commission')(cloneElement(ApplyCommissionExtract, {
  COMMISSION_STATUS,
  isMarketing: true,
}));

// 提现详情页面
const ApplyPutForwardInfoRoute = RoutePath('/finance-manage/apply-put-forward/:id')(cloneElement(ApplyPutForward));

// 企业/门店 发起提现（edit页面）
const ApplyPutForwardRoute = RoutePath('/finance-manage/apply-put-forward')(cloneElement(ApplyPutForward, {
  isApply: true,
}));
// 营销总监发起提现 (edit)
const ApplyPutForwardMarketingDirectorRoute = RoutePath('/finance-marketing-manage/apply-put-forward')(cloneElement(ApplyPutForward, {
  isApply: true,
  isMarketing: true,
}));

export {
  ApplyPutForwardRoute,
  ApplyPutForwardInfoRoute,
  ApplyCommissionExtractRoute,
  ErpApplyCommissionExtractRoute,
  CompanyEarningsListRoute,
  CompanyEarningsInfoRoute,

  ApplyPutForwardMarketingDirectorRoute,
  ApplyCommissionMarketingDirectorExtractRoute,
}
