import { PROJECT_CONFIG, PAGE_EDIT_TYPE } from '@common/config';
import * as rexRules from '@tools';
import { OCCUPATION } from '../../enum';

export default (app, { enumObj }) => {
  const isQuery = enumObj.value === PAGE_EDIT_TYPE.SEE.value;
  const isAudit = enumObj.value === PAGE_EDIT_TYPE.AUDIT.value;
  const isEdit = enumObj.value === PAGE_EDIT_TYPE.EDIT.value;
  return [{
    col: 2,
    decorator: [{
      item: {
        label: '平台账户',
      },
      entry: {
        key: 'input',
        disabled: isQuery || isAudit,
        placeholder: '请输入平台账户',
      },
      filedDecorator: {
        key: 'account',
        rules: [rexRules.inputRequired, rexRules.phone],
      },
    }, {
      label: '上级创客',
      entry: {
        key: 'input',
        placeholder: '请输入上级创客',
        disabled: isQuery || isAudit || isEdit,
      },
      filedDecorator: {
        key: 'parentName',
        rules: [rexRules.inputRequired],
      },
    }, {
      label: '姓名',
      entry: {
        key: 'input',
        placeholder: '请输入姓名',
        disabled: isQuery || isAudit,
      },
      filedDecorator: {
        key: 'name',
        rules: [rexRules.inputRequired],
      },
    }, {
      label: '联系电话',
      entry: {
        key: 'input',
        placeholder: '请输入联系电话',
        disabled: isQuery || isAudit,
      },
      filedDecorator: {
        key: 'phone',
      },
    }, {
      label: '联系邮箱',
      entry: {
        key: 'input',
        placeholder: '请输入联系邮箱',
        disabled: isQuery || isAudit,
      },
      filedDecorator: {
        key: 'email',
      },
    }, {
      label: '职业',
      entry: {
        key: 'select',
        placeholder: '请选择职业',
        children: { ...OCCUPATION },
        disabled: isQuery || isAudit,
      },
      filedDecorator: {
        key: 'occupation',
      },
    }, {
      item: {
        label: '地区',
      },
      entry: {
        key: 'input',
        placeholder: '请输入地区',
        disabled: isQuery || isAudit,
      },
      filedDecorator: { key: 'addressDetail' },
    }, {
      item: {
        label: '状态',
      },
      author: {
        system: PROJECT_CONFIG.ERP.platform,
      },
      entry: {
        key: 'switch',
        disabled: isQuery || isAudit,
        checkedChildren: '启用',
        unCheckedChildren: '禁用',
      },
      filedDecorator: { key: 'enableStatus' },
    }],
  }];
};
