import React, { Component } from 'react';
import moment from 'moment';
import { SearchForm, particulate, Authorized } from '@components';
import { createStandardTabs } from '@model';
import { getQueryKey } from '@tools';
import { formConfig, tableConfig } from '../config';

const { createPaginationTable } = particulate;
const Form = SearchForm(formConfig);
const Table = createPaginationTable(tableConfig, false);
const TabsTable = createStandardTabs(Form, Table);

class List extends Component {
  constructor(props, context) {
    super(props, context);
    const { location: { search } } = props;
    const searchEnumKey = getQueryKey(search, 'enumKey');
    const { defaultActiveKey="SUCCESS" } = props;
    this.currentPlan = searchEnumKey || defaultActiveKey;
  }

  onEdit(e, record, pageTitle = '佣金提现') {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const { onEdit } = this.props;
    if (onEdit) onEdit(record, pageTitle);
  }

  fetchList(fields) {
    const { fetchList=() => null, COMMISSION_STATUS } = this.props;
    const { enumKey, applyTime={}, ...reset } = fields;
    const params = {
      enumKey,
      ...reset,
      status: COMMISSION_STATUS[enumKey].value,
      startCreateTime: applyTime.start ? moment(applyTime.start).format('YYYY-MM-DD 00:00:00') : undefined,
      endCreateTime: applyTime.end ? moment(applyTime.end).format('YYYY-MM-DD 23:59:59') : undefined,
    };
    fetchList(params);
  }

  renderAction(value, record) {
    return (
      <Authorized>
        <span>
          <a onClick={(e) => this.onEdit(e, record, `佣金提现`)}>查看</a>
        </span>
      </Authorized>
    );
  }

  render() {
    const { sourceMap, isHeadFixed, COMMISSION_STATUS } = this.props;
    return (
      <TabsTable
        columnsRender={{
          action: (...arg) => this.renderAction(...arg),
        }}
        ENUM_STATUS={{ ...COMMISSION_STATUS }}
        isHeadFixed={isHeadFixed}
        storeState={sourceMap}
        defaultActiveKey={this.currentPlan}
        fetchList={(...arg) => this.fetchList(...arg)}
      />
    );
  }
}

export default List;
