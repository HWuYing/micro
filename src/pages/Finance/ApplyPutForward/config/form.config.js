import * as rexRules from '@tools';
import { PROJECT_CONFIG } from '@common/config';
import { COMMISSION_STATUS } from '../../enum';

const { factoryRecursion } = rexRules;

// isApply 申请提现
// state 数据状态
export default (app, { isApply, renderApplyQuota }) => [{
  author: { '!isApply': true },
  label: '提现单号',
  entry: {
    key: 'text',
  },
  filedDecorator: {
    key: 'id',
  },
}, {
  label: '账户类型',
  entry: {
    placeholder: '请输入账户类型',
    key: 'select',
    disabled: !isApply,
    children: [
      { label: '个人账户', value: '1' },
      { label: '公司账户', value: '2' },
    ],
  },
  filedDecorator: {
    key: 'accountType',
    rules: [rexRules.inputRequired],
  },
}, {
  label: '账户名称/开户人',
  entry: {
    key: 'input',
    disabled: !isApply,
    placeholder: '请输入账户名称/开户人',
  },
  filedDecorator: {
    key: 'accountName',
    rules: [rexRules.inputRequired],
  },
}, {
  label: '选择银行',
  entry: {
    placeholder: '请选择银行',
    key: 'backSelect',
    labelName: 'name',
    valueName: 'id',
    children: [],
    showSearch: true,
    disabled: !isApply,
    filterOption: (input, { props: { children = ''} }) => {
      return children.indexOf(input) !== -1;
    },
  },
  filedDecorator: {
    key: 'bankId',
    rules: [rexRules.selectRequired],
  },
}, {
  label: '分支行',
  entry: {
    key: 'input',
    disabled: !isApply,
    placeholder: '请输入分支行',
  },
  filedDecorator: {
    key: 'branchName',
    rules: [rexRules.inputRequired],
  },
}, {
  label: '开户行省市',
  entry: {
    placeholder: '请选择省市',
    key: 'regionCascader',
    titleName: 'name',
    valueName: 'id',
    labelInValue: true,
    changeOnSelect: true,
    disabled: !isApply,
    sourceFilter: (data) => {
      factoryRecursion(data).each(item => {
        if (item.level && item.level === 2) {
          Object.assign(item, {
            children: undefined,
          });
        }
      });
      return true;
    },
  },
  filedDecorator: {
    key: 'region',
    rules: [rexRules.selectRequired],
  },
}, {
  label: '提现账户',
  entry: {
    key: 'input',
    disabled: !isApply,
    placeholder: '请输入提现账户',
  },
  filedDecorator: {
    key: 'accountId',
    rules: [rexRules.selectRequired],
  },
}, {
  label: '提现额度',
  entry: {
    key: 'input',
    disabled: !isApply,
    placeholder: '请输入提现额度',
  },
  filedDecorator: {
    key: 'amount',
    rules: [rexRules.inputRequired, rexRules.money],
  },
  render: renderApplyQuota,
}, {
  author: {
    '!isApply': true,
  },
  label: '提现申请人',
  entry: {
    key: isApply ? 'input' : 'text',
    placeholder: '请输入提现申请人',
    rules: [rexRules.inputRequired],
  },
  filedDecorator: {
    key: 'userName',
  },
}, {
  author: {
    '!isApply': true,
  },
  label: '申请人电话',
  entry: {
    key: isApply ? 'input' : 'text',
    placeholder: '请输入申请人电话',
  },
  filedDecorator: {
    key: 'tel',
    rules: [rexRules.mobile],
  },
}, {
  label: '状态',
  author: { '!isApply': true },
  entry: {
    key: 'text',
  },
  filedDecorator: {
    key: 'state',
  },
}, {
  label: '理由',
  author: { type: COMMISSION_STATUS.AUDIT_FAIL.value, '!isApply': true },
  entry: {
    key: 'text',
  },
  filedDecorator: {
    key: 'remark',
  },
}];
