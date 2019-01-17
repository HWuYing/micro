import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reducer } from '@applyStore';
import { particulate, Authorized } from '@components';
import { BasicPage } from '@pageModel';
import { getQueryKey } from '@tools';
import { createStandard } from '@model';
import { reducers, action } from '../../store';
import tableConfig from '../config/table.config';
import { EDIT_TYPE } from '../../enum';

const { createPaginationTable } = particulate;
const Page = BasicPage(createStandard(undefined, createPaginationTable(tableConfig, false)));

@connect(({ storeManage: { lowerList } }) => ({ lowerList }), {
  getDecorList: action.getDecorList,
})
@reducer('storeManage', reducers)
class MenuEdit extends Component {
  constructor(props, context) {
    super(props, context);
    const { location: { search } } = props;
    const enumValue = getQueryKey(search, 'type');
    this.enumObj = EDIT_TYPE[Object.keys(EDIT_TYPE).filter((key) => EDIT_TYPE[key].value === enumValue)[0]];
  }

  onClose() {
    const { $util: { closeAndSwitch }, pageTitle, fromMenu: {
      fromTitle,
    }} = this.props;
    closeAndSwitch(pageTitle, fromTitle);
  }

  fetchList(fields) {
    const { match: { params }, getDecorList } = this.props;
    getDecorList({
      ...params,
      ...fields,
    });
  }

  render() {
    const { lowerList: { list, total } } = this.props;
    return (
      <Page
        fetchList={(...arg) => this.fetchList(...arg)}
        dataSource={list}
        total={total}
      />
    );
  }
}

export default MenuEdit;
