import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { SearchForm, Authorized, particulate } from '@components';
import { Page as createPage } from '@pageModel';
import { createStandardTabs } from '@model';
import { component } from '@particulate';
import { getQueryKey } from '@tools';
import { PROJECT_CONFIG } from '@common/config';
import * as action from '../../store/action/index';
import { searchConfig, tableConfig } from '../config';
import { STATUA_ENUM } from '../../store/constant/index';

const { STORE, ERP } = PROJECT_CONFIG;
const { saveRef } = component;
const { createStandardToolsTable } = particulate;
const Form = SearchForm(searchConfig);
const Table = createStandardToolsTable(tableConfig, null, {
  deleteStatus: false,
});
const Page = createPage(createStandardTabs(Form, Table));

@connect(
  ({}) => ({}),
  {
    getList: action.getList,
  }
)
class List extends Component {
  constructor(props, context) {
    super(props, context);
    const {
      location: { search },
    } = props;
    this.state = {
      activeState: getQueryKey(search || '', 'activeState') || '11',
      dataSource: {},
    };
  }

  edit(id) {
    const {
      $util: { closeAndOpen },
    } = this.props;

    closeAndOpen('立即充值', {
      name: '支付详情',
      path: `/payment/ucurreny-pay-detail/${id}`,
    });
  }

  view(id) {
    const {
      $util: { closeAndOpen },
    } = this.props;

    closeAndOpen('订单详情', {
      name: '订单详情',
      path: `/payment/ucurreny-detail/${id}`,
    });
  }

  async fetchList(params) {
    const { time } = params;
    const fields = {};
    const { dataSource } = this.state;
    if (time) {
      fields.endOrderTime = time.end ? moment(time.end).format('YYYY-MM-DD 23:59:59') : undefined;
      fields.startOrderTime = time.start
        ? moment(time.start).format('YYYY-MM-DD 00:00:00')
        : undefined;
    }

    const res = await this.props.getList({
      ...fields,
      ...params,
      state: STATUA_ENUM[params.enumKey].value,
    });
    const { data, total } = res;

    this.setState({
      dataSource: {
        ...dataSource,
        [params.enumKey]: { list: data, total },
      },
    });
  }

  onTabsChange(activeKey) {
    this.setState({
      activeState: activeKey,
    });
  }

  renderTools = () => {
    return <Authorized />;
  };

  renderAction(value, record) {
    const author = { state: record.state };
    return (
      <Authorized author={author}>
        <a
          onClick={() => this.edit(record.id)}
          author={{
            system: [STORE.platform],
            state: 11,
          }}
        >
          立即充值
        </a>
        <a onClick={() => this.view(record.id)}>订单详情</a>
      </Authorized>
    );
  }

  render() {
    const { activeState, dataSource } = this.state;

    return (
      <Page
        ENUM_STATUS={STATUA_ENUM}
        storeState={dataSource}
        defaultActiveKey={activeState.toString()}
        getPage={saveRef(this, 'page')}
        tableContext={{
          renderAction: (...arg) => this.renderAction(...arg),
        }}
        defaultExpandAllRows
        fetchList={(...arg) => this.fetchList(...arg)}
        renderTools={this.renderTools()}
        onTabsChange={(...arg) => this.onTabsChange(...arg)}
      />
    );
  }
}

export default List;
