import { component } from '@particulate';
import { RoutePath } from '@applyComponent';
import { PROJECT_CONFIG } from '@common/config';
import { COMPANY_STATUS } from './enum';
import CompanyList from './List/container';
import SalesDataList from './SalesDataList/container';
import DistributorList from './DistributorList/container';
import InvitaionCode from './InvitationCode/container';

// 装企管理 列表
const EnterpriseListRoute = RoutePath('/enterprise-manage/enterprise-list')(
  component.cloneElement(CompanyList, {
    companyType: PROJECT_CONFIG.ENTERPRISE.value,
    audit: COMPANY_STATUS.THROUGH_AUDIT,
  })
);

// 装企管理 销售数据列表
const EnterpriseSalesListRoute = RoutePath('/enterprise-manage/sales-order/list/:companyId')(
  component.cloneElement(SalesDataList, {
    companyType: PROJECT_CONFIG.ENTERPRISE.value,
  })
);

// 装企管理 创客列表
const EnterpriseDistributorListRoute = RoutePath('/enterprise-manage/distributor/list/:companyId')(
  component.cloneElement(DistributorList, {
    companyType: PROJECT_CONFIG.ENTERPRISE.value,
  })
);

// 装企管理 邀请码
const EnterpriseInvitaionCodeRoute = RoutePath('/enterprise-manage/invite-code')(
  component.cloneElement(InvitaionCode, {
    companyType: PROJECT_CONFIG.ENTERPRISE.value,
  })
);

// 服务商 列表
const ServiceProviderListRoute = RoutePath('/service-provider-manage/service-provider-list')(
  component.cloneElement(CompanyList, {
    companyType: PROJECT_CONFIG.SERVICE.value,
    audit: COMPANY_STATUS.THROUGH_AUDIT,
  })
);

// 服务商 邀请码
const ServiceProviderInvitaionCodeRoute = RoutePath('/service-provider-manage/invite-code')(
  component.cloneElement(InvitaionCode, {
    companyType: PROJECT_CONFIG.SERVICE.value,
  })
);


// 服务商 销售数据列表
const ServiceProviderSalesListRoute = RoutePath('/service-provider-manage/sales-order/list/:companyId')(
  component.cloneElement(SalesDataList, {
    companyType: PROJECT_CONFIG.SERVICE.value,
  })
);

// 服务商 创客列表
const ServiceProviderDistributorListRoute = RoutePath('/service-provider-manage/distributor/list/:companyId')(
  component.cloneElement(DistributorList, {
    companyType: PROJECT_CONFIG.SERVICE.value,
  })
);

export {
  EnterpriseListRoute,
  EnterpriseSalesListRoute,
  EnterpriseInvitaionCodeRoute,
  EnterpriseDistributorListRoute,
  ServiceProviderListRoute,
  ServiceProviderInvitaionCodeRoute,
  ServiceProviderSalesListRoute,
  ServiceProviderDistributorListRoute,
};
