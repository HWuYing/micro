import { PROJECT_CONFIG } from '@common/config';
import { COMPANY_LEVEL } from '../../enum';

export default (app, { companyType }) => (companyType === PROJECT_CONFIG.ENTERPRISE.value ? {
  decorator: [{
    item: {
      label: '装企名称',
    },
    entry: {
      key: 'input',
      placeholder: '请输入名称',
    },
    filedDecorator: {
      key: 'name',
    },
  }, {
    label: '装企等级',
    entry: {
      key: 'select',
      children: {
        ALL: { label: '全部', value: ''},
        ...COMPANY_LEVEL,
      },
      placeholder: '请选择等级',
    },
    filedDecorator: {
      key: 'companyLevel',
      initialValue: '',
    },
  }],
} : {
  decorator: [{
    item: {
      label: '服务商名称',
    },
    entry: {
      key: 'input',
      placeholder: '请输入名称',
    },
    filedDecorator: {
      key: 'name',
    },
  }],
});
