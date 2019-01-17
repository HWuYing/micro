import moment from 'moment';
import { statusFlagBadge, typeToLabel } from '@tools';
import { ACTIVITY_STATUS, U_BEAN_QR_STATUS } from '../../enum';

export default () => [{
  title: '绑定角色',
  dataIndex: 'companyName',
  width: 200,
}, {
  title: '总条数',
  dataIndex: 'totalCount',
  width: 170,
}, {
  title: '单笔领取数',
  dataIndex: 'unitCoinCount',
  width: 150,
}, {
  title: '已领取笔数',
  dataIndex: 'checkCount',
  width: 150,
}, {
  title: '活动状态',
  dataIndex: 'status',
  width: 120,
  render: val => typeToLabel(val, ACTIVITY_STATUS),
}, {
  title: '二维码状态',
  dataIndex: 'zipStatus',
  width: 160,
  render: val => typeToLabel(val, U_BEAN_QR_STATUS),
}, {
  title: '添加时间',
  dataIndex: 'updateTime',
  width: 200,
  render: val => val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '--',
}, {
  title: '有效时间范围',
  dataIndex: 'startTime',
  width: 360,
  render: (val, record) => {
    const { endTime } = record;
    const formatEndTime = endTime ? moment(endTime).format('YYYY-MM-DD HH:mm:ss') : '待定';
    const formatStartTime = val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '待定';
    return `${formatStartTime} - ${formatEndTime}`;
  }
}, {
  title: '操作',
  width: 240,
  dataIndex: 'action',
}];
