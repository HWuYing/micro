import '@pages';
import store from '@applyStore';
import { IS_MICRO } from '@common/config';
import '../global';
import '../components/Entry';

window.store = store;
console.log("micro===>", IS_MICRO);
console.log(window);
console.log(window.app);
console.log('platform====>', window.PLATFORM);
console.log('token===>', window.getToken());


