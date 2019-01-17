import { RoutePath } from '@applyComponent';
import MyUCurrencyPage from './UCurrencyManage/MyUCurrency/index';
import UCurrencySet from './UCurrencyManage/UCurrencySetting/index';
import UCurrenyRechargePage from './UCurrencyManage/MyUCurrency/containers/recharge';
import UCurrenyMPage from './UCurrencyManage/PurchaseDetails/containers/index';
import UCurrencyPayForm from './UCurrencyManage/MyUCurrency/containers/payForm';
import UCurrencyPayDetailView from './UCurrencyManage/MyUCurrency/containers/detail';
import UCurrencyDetailView from './UCurrencyManage/PurchaseDetails/containers/details';

export * from './Store';
export * from './Channel';
export * from './Company';
export * from './Distributor';
export * from './Finance';
export * from './Activity';
export * from './UserCategory';

// 我的U币
const UCurrencySetting = RoutePath('/payment/ucurrency-setting')(UCurrencySet);
const MyUCurrency = RoutePath('/payment/ucurrency-index')(MyUCurrencyPage);
const UCurrenyRecharge = RoutePath('/payment/ucurrency-recharge/:id')(UCurrenyRechargePage);
const UCurrencyManage = RoutePath('/payment/ucurrency-list')(UCurrenyMPage);
const UCurrencyPay = RoutePath('/payment/ucurreny-pay/:oldNum/:exchange')(UCurrencyPayForm);
const UCurrencyPayDetail = RoutePath('/payment/ucurreny-pay-detail/:id')(UCurrencyPayDetailView);
const UCurrencyDetail = RoutePath('/payment/ucurreny-detail/:id')(UCurrencyDetailView);

export {
  UCurrencySetting,
  MyUCurrency,
  UCurrenyRecharge,
  UCurrencyManage,
  UCurrencyPay,
  UCurrencyReCharge,
  UCurrencyPayDetail,
  UCurrencyDetail,
};
