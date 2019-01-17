import { RoutePath } from '@applyComponent';
import { component } from '@particulate';
import { PAGE_EDIT_TYPE } from '@common/config';
import ScanCodePresentation from './ScanCodePresentation/container';

const { cloneElement } = component;
// U豆扫码赠送活动
const  ScanCodePresentationRoute = RoutePath('/activity/u-bean/scan-code-presentation')(ScanCodePresentation);

export {
  ScanCodePresentationRoute,
}
