import { PAGE_EDIT_TYPE } from '@common/config';
import * as rexRules from '@tools';

export default (app, { editType }) => {
  const isAdd = editType === PAGE_EDIT_TYPE.ADD.value;
  return [{
    col: 1,
    decorator: [{
      item: {
        label: '注册手机',
      },
      entry: {
        key: 'input',
        disabled: !isAdd,
        placeholder: '请输入手机号码',
      },
      filedDecorator: {
        key: 'tel',
        rules: [rexRules.inputRequired, rexRules.mobile],
      },
    }, {
      label: '真实姓名',
      entry: {
        key: 'input',
        placeholder: '请输入姓名',
      },
      filedDecorator: {
        key: 'nickName',
        rules: [rexRules.inputRequired],
      },
    }],
  }];
};
