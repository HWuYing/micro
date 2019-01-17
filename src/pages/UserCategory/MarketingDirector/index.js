import { RoutePath } from '@applyComponent';
import { component } from '@particulate';
import { PAGE_EDIT_TYPE } from '@common/config';
import MarketingDirectorList from './List/container';
import MarketingDirectorEdit from './Edit/container';
import RelationServiceProvider from './RelationServiceProvider/container';

const { cloneElement } = component;
// 营销总监列表
const  MarketingDirectorListRoute = RoutePath('/marketing-director-manage/list')(MarketingDirectorList);
// 新增营销总监
const AddMarketingDirector = RoutePath(`/marketing-director-manage/${PAGE_EDIT_TYPE.ADD.prefix}/:id`)(cloneElement(MarketingDirectorEdit, {
  editType: PAGE_EDIT_TYPE.ADD.value,
}));
// 编辑营销总监
const EditMarketingDirector = RoutePath(`/marketing-director-manage/${PAGE_EDIT_TYPE.EDIT.prefix}/:id`)(cloneElement(MarketingDirectorEdit, {
  editType: PAGE_EDIT_TYPE.EDIT.value,
}));
// 营销总监 关联服务商列表
const RelationServiceProviderListRoute = RoutePath('/marketing-director-manage/relation-service-provider/:id')(RelationServiceProvider);

export {
  MarketingDirectorListRoute,
  AddMarketingDirector,
  EditMarketingDirector,
  RelationServiceProviderListRoute,
}
