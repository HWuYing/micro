import moment from 'moment';

export default () => [{
  title: '服务商名称',
  dataIndex: 'companyName',
  width: 200,
}, {
  title: '分拥比例',
  dataIndex: 'districtRate',
  width: 240,
  render: val => {
    if (!val && val !== 0) return '暂无数据';
    return `营销总监 ${ Number(val)}%  服务商 ${100 - Number(val)}%`;
  },
}, {
  title: '服务商创建时间',
  dataIndex: 'updateTime',
  width: 240,
  render: val => val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '--',
}, {
  title: '操作',
  width: 190,
  dataIndex: 'action',
}];
