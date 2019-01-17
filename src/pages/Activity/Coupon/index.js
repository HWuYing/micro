import { RoutePath } from '@applyComponent';
import CouponActivityList from './List/container';
import CouponActivityEdit from './Edit/container';

const CouponActivityListRoute = RoutePath('/activity/coupon/list')(CouponActivityList);
const CouponActivityEditRoute = RoutePath('/activity/coupon/edit/:id')(CouponActivityEdit);

export {
  CouponActivityListRoute,
  CouponActivityEditRoute,
}
