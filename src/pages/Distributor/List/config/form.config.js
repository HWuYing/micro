import { DISTRIBUTOR_STATUS } from '../../enum';

const defaultAuditValue = [DISTRIBUTOR_STATUS.THROUGH_AUDIT.value, DISTRIBUTOR_STATUS.FAILURE_AUDIT.value ].join(',');

export default () => ({
  decorator: [{
    item: {
      label: '登录手机',
    },
    entry: {
      key: 'input',
      placeholder: '请输入登录手机',
    },
    filedDecorator: {
      key: 'phone',
    },
  }, {
    author: { audit: false },
    item: {
      label: '审核状态',
    },
    entry: {
      key: 'select',
      children: Object.keys(DISTRIBUTOR_STATUS).reduce((o, key) => {
        if (key !== 'WAIT_AUDIT') Object.assign(o, { [key]: { ...DISTRIBUTOR_STATUS[key] } });
        return o;
      }, {
        ALL: { label: '全部', value: defaultAuditValue },
      }),
      placeholder: '请选择审核状态',
    },
    filedDecorator: {
      key: 'auditStatus',
      initialValue: defaultAuditValue,
    },
  }, {
    author: { audit: false },
    item: {
      label: '分销状态',
    },
    entry: {
      key: 'select',
      children: [
        { label: '全部', value: '' },
        { label: '启用', value: '1' },
        { label: '禁用', value: '2' },
      ],
      placeholder: '请选择审核状态',
    },
    filedDecorator: {
      key: 'enableStatus',
      initialValue: '',
    },
  }],
});
