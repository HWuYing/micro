import moment from 'moment';
import * as rexRules from '@tools';
import { COMPANY_TYPE, ACTIVITY_STATUS  } from '../../enum';

export default (root, { queryCompanyEntry, currentRecord }) => {
  const isStarting = currentRecord.status && currentRecord.status.toString() === ACTIVITY_STATUS.STARTING.value.toString();
  return {
    col: 1,
    decorator: [{
      label: '绑定相关角色类型',
      entry: {
        key: 'select',
        disabled: isStarting,
        placeholder: '请输入注册手机',
        children: { ...COMPANY_TYPE },
      },
      filedDecorator: {
        key: 'companyType',
        initialValue: COMPANY_TYPE.STORE.value.toString(),
      },
    }, {
      label: '查询相关组织角色',
      entry: {
        key: 'select',
        disabled: isStarting,
        labelInValue: true,
        labelName: 'name',
        valueName: 'id',
        showSearch: true,
        filterOption: false,
        children: [],
        allowClear: true,
        placeholder: '查询相关组织',
      },
      filedDecorator: {
        key: 'company',
        rules: [rexRules.selectRequired],
        initialValue: '',
      },
      render: queryCompanyEntry,
    }, {
      label: '赠送总笔数',
      entry: {
        key: 'inputNumber',
        min: 1,
        style: { width: '100%' },
        placeholder: '请输入赠送总笔数',
      },
      filedDecorator: {
        key: 'totalCount',
        rules: [rexRules.inputRequired, rexRules.positiveInteger],
      },
    }, {
      label: '每笔总U豆数量',
      entry: {
        key: 'inputNumber',
        min: 1,
        style: { width: '100%' },
        placeholder: '请输入每笔总U豆数量',
      },
      filedDecorator: {
        key: 'unitCoinCount',
        rules: [rexRules.inputRequired, rexRules.positiveInteger],
      },
    }, {
      label: 'U豆领取有效时间',
      entry: {
        key: 'dateRange',
        showTime: true,
        disabled: isStarting,
        format: 'YYYY-MM-DD hh:mm:ss',
        ...(() => {
          const date = new Date();
          const minDate = moment(date.setDate(date.getDate() - 1)).endOf('day');
          return {
            disabledStartDate: current => current && current < minDate,
            disabledEndDate: current => current && current < minDate,
          }
        })(),
      },
      filedDecorator: {
        key: 'time',
        rules: [rexRules.selectRequired],
      },
    }],
  };
}
