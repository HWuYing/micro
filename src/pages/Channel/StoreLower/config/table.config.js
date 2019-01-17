import moment from 'moment';
import { typeToLabel } from '@tools';
import { LEVEL, COMPANY_TYPE } from '../enum';

export default () => [ {
  title: '企业名称',
  dataIndex: 'name',
  width: 200,
}, {
  title: '注册手机',
  dataIndex: 'tel',
  width: 200,
}, {
  title: '客户类型',
  dataIndex: 'orgType',
  width: 100,
  render: val => typeToLabel(val, COMPANY_TYPE),
}, {
  title: '添加时间',
  dataIndex: 'updateTime',
  width: 240,
  render: val => val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '--',
}, {
  title: '操作',
  width: 190,
  dataIndex: 'action',
}];
