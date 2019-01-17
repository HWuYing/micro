import { component } from '@particulate';
import { RoutePath } from '@applyComponent';
import { COMPANY_TYPE } from './StoreLower/enum';
import StoreLower from './StoreLower/container';

// 门店下级渠道
const StoreLowerRoute = RoutePath('/lowerchannel-manage/lowerchannel-list')(StoreLower);

// 装企下级渠道
const EnterpriseLowerRoute = RoutePath('/lowerchannel-manage/enterprise-list')(component.cloneElement(StoreLower, {
  companyType: COMPANY_TYPE.ENTERPRISE.value,
}));

// 服务商下级渠道
const ServiceProviderLowerRoute = RoutePath('/lowerchannel-manage/service-provider-list')(component.cloneElement(StoreLower, {
  companyType: COMPANY_TYPE.SERVICE_PROVIDER.value,
}));

export {
  StoreLowerRoute,
  EnterpriseLowerRoute,
  ServiceProviderLowerRoute,
};
