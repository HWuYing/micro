
import { registryEntry, ConnectToEntry } from '@components/particulate/Entry';
import { factory } from '@particulate';
import Select from '@components/particulate/Entry/Select';
import TreeSelect from '@components/particulate/Entry/TreeSelect';
import { globalAction } from '../../global';

const { batchEntryMap } = factory;

registryEntry(
  batchEntryMap({
    'goodsCategoryThree': ConnectToEntry(Select, 'goodsCategoryThree', globalAction.getGoodsCategoryThree),
    'goodsCategoryTree': ConnectToEntry(TreeSelect, 'goodsCategoryTree', globalAction.getGoodsCategoryTree),
    'goodsBrandSelect': ConnectToEntry(Select, 'goodsBrandList', globalAction.getGoodsBrandList),
    'backSelect': ConnectToEntry(Select, 'bankList', globalAction.getBankList),
    'storeSelect': ConnectToEntry(Select, 'storeList', globalAction.getStoreList),
  })
);
