import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { PROJECT_CONFIG } from '@common/config';
import { reducer } from '@applyStore';
import { SearchForm, particulate, Authorized } from '@components';
import { createStandard } from '@model';
import { BasicPage } from '@pageModel';
import { formConfig, tableConfig } from '../config';
import { action, reducers } from '../../store';

const { createPaginationToolsTable } = particulate;
const Form = SearchForm(formConfig, undefined, {
  col: 1,
});
const Table = createPaginationToolsTable(tableConfig, false);
const Page = BasicPage(createStandard(undefined, Table));

@connect(({ companyManage: { decorOrderList } }) => ({ decorOrderList }), {
  getList: action.getDecorOrderList,
})
@reducer('companyManage', reducers)
class List extends Component {
  async fetchList(fields) {
    const { getList, match: { params }  } = this.props;
    await getList({
      ...fields,
      ...params,
    });
  }

  render() {
    const { decorOrderList: { list, total } } = this.props;
    return (
      <Fragment>
        <Page
          dataSource={list}
          total={total}
          fetchList={(...arg) => this.fetchList(...arg)}
        />
      </Fragment>
    );
  }
}

export default List;
