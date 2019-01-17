import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { SearchForm, particulate, Authorized } from '@components';
import { createStandardTabs } from '@model';
import { reducer } from '@applyStore';
import { BasicPage } from '@pageModel';
import { formConfig, tableConfig } from '../config';
import { EARNINGS_SETTLEMENT } from '../../enum';
import { action, reducers } from '../../store';

const { createPaginationTable } = particulate;
const Form = SearchForm(formConfig);
const Table = createPaginationTable(tableConfig, false);
const TabsTable = createStandardTabs(Form, Table);
const Page = BasicPage(TabsTable);

@connect(({ financeManage: { incomeMap } }) => ({ incomeMap }), {
  getIncomeList: action.getIncomeList,
})
@reducer('financeManage', reducers)
class List extends Component {
  constructor(props, context) {
    super(props, context);
    this.currentPlan = 'ALREADY';
  }

  onEdit(e, record, pageTitle = '收益详情') {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const { $util: { closeAndOpen } } = this.props;
    const { id } = record;
    closeAndOpen(pageTitle, {
      name: pageTitle,
      path: `/finance-manage/revenue/info/${id}`,
    });
  }

  async fetchList(fields) {
    const { getIncomeList } = this.props;
    const { enumKey } = fields;
    const { applyTime: { start, end } = {}, ...reset } = fields;
    const params = {
      status: EARNINGS_SETTLEMENT[enumKey].value,
      ...reset,
      startSettlementTime: start ? moment(start).format('YYYY-MM-DD 00:00:00') : undefined,
      endSettlementTime: end ? moment(end).format('YYYY-MM-DD 00:00:00') : undefined,
    };
    getIncomeList(params);
  }

  renderAction(value, record) {
    return (
      <Authorized>
        <span>
          <a onClick={(e) => this.onEdit(e, record, `佣金详情`)}>查看</a>
        </span>
      </Authorized>
    );
  }

  render() {
    const { incomeMap } = this.props;
    return (
      <Page
        columnsRender={{
          action: (...arg) => this.renderAction(...arg),
        }}
        ENUM_STATUS={{ ...EARNINGS_SETTLEMENT }}
        storeState={incomeMap}
        defaultActiveKey={this.currentPlan}
        fetchList={(...arg) => this.fetchList(...arg)}
      />
    );
  }
}

export default List;
