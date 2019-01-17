import { RoutePath } from '@applyComponent';
import StoreActivityList from './List/container';
import StoreActivityEdit from './Edit/container';

const StoreActivityListRoute = RoutePath('/activity/store/list')(StoreActivityList);
const StoreActivityEditRoute = RoutePath('/store-activities/edit/:id')(StoreActivityEdit);

export {
  StoreActivityListRoute,
  StoreActivityEditRoute,
}
