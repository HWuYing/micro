import { RoutePath } from '@applyComponent';
import { component } from '@particulate';
import { PAGE_EDIT_TYPE } from '@common/config';
import { DISTRIBUTOR_STATUS, COMMISSION_STATUS } from './enum';
import DistributorList from './List/container';
import DistributorEdit from './Edit/container';
import SubordinateList from './SubordinateList/container';
import OrderList from './OrderList/container';
import CommissionAuditList from './CommissionAuditList/container';
import CommissionEdit from './CommissionEdit/container';
import DefaultCommissionConfig from './DefaultCommissionConfig/container';
import StoreCommissionConfig from './StoreCommissionConfig/container';
import CompanyCommissionConfig from './CompanyCommissionConfig/container';

const { cloneElement } = component;

// 经销商管理列表 （审核通过）
const DistributorManageListRoute = RoutePath('/distributor-manage/manage-list')(
  cloneElement(DistributorList, {
    auditStatus: [
      DISTRIBUTOR_STATUS.THROUGH_AUDIT.value,
      DISTRIBUTOR_STATUS.FAILURE_AUDIT.value,
    ],
    audit: false,
  })
);
// 经销商管理列表 （审核列表）
const DistributorAuditListRoute = RoutePath('/distributor-manage/audit-list')(
  cloneElement(DistributorList, {
    auditStatus: [DISTRIBUTOR_STATUS.WAIT_AUDIT.value],
    audit: true,
  })
);
// 下级经销商
const SubordinateListRoute = RoutePath('/distributor-manage/subordinate-list/:distributorId')(SubordinateList);
// 经销商订单列表
const DistributorOrderListRoute = RoutePath('/distributor-manage/order-list/:distributorId')(OrderList);
// 经销商审核
const DistributorAuditRoute = RoutePath('/distributor-manage/audit/:id')(
  cloneElement(DistributorEdit, {
    editType: PAGE_EDIT_TYPE.AUDIT.value,
  })
);
// 经销商详情
const DistributorInfoRoute = RoutePath('/distributor-manage/info/:id')(
  cloneElement(DistributorEdit, {
    editType: PAGE_EDIT_TYPE.SEE.value,
  })
);
// 下级经销商佣金审核
const CommissionAuditListRoute = RoutePath('/distributor-manage/commission/list')(cloneElement(CommissionAuditList, {
  COMMISSION_STATUS,
}));
// 平台全局设置默认经销商分拥配置
const DefaultCommissionConfigRoute = RoutePath('/distributor-manage/commission/default-config')(DefaultCommissionConfig);
// 门店经销商分拥配置
const StoreCommissionConfigRoute = RoutePath('/distributor-manage/commission/store-config')(StoreCommissionConfig);
// 企业经销商分拥配置
const CompanyCommissionConfigRoute = RoutePath('/distributor-manage/commission/company-config')(CompanyCommissionConfig);
// 提现详情 (edit页面)
const CommissionEditRoute = RoutePath('/distributor-manage/commission/:id')(CommissionEdit);

export {
  DistributorManageListRoute,
  DistributorAuditListRoute,
  DistributorAuditRoute,
  DistributorInfoRoute,
  DistributorOrderListRoute,
  SubordinateListRoute,
  CommissionAuditListRoute,
  DefaultCommissionConfigRoute,
  StoreCommissionConfigRoute,
  CompanyCommissionConfigRoute,
  CommissionEditRoute,
}
