import { RoutePath } from '@applyComponent';
import StoreList from './List/container';
import LowerChannel from './Lowerchannel/container';
import InvitationCode from '../Company/InvitationCode/container';

// 门店列表
const StoreListRoute = RoutePath('/store-manage/list')(StoreList);
// 门店下级渠道
const LowerChannelRoute = RoutePath('/store-manage/lowerchannel/:supperStore')(LowerChannel);
// 门店邀请码
const StoreInvitationCodeRoute = RoutePath('/store-manage/invite-code')(InvitationCode);

export {
  StoreListRoute,
  LowerChannelRoute,
  StoreInvitationCodeRoute,
}
