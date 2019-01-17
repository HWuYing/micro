import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PROJECT_CONFIG } from '@common/config';
import { SearchForm, Authorized, particulate } from '@components';
import { StandardPage } from '@pageModel';
import { component } from '@particulate';
import * as action from '../../store/action/index';
import { searchConfig, tableConfig } from '../config';

const { ENTERPRISE, STORE } = PROJECT_CONFIG;

const { saveRef } = component;
const { createStandardToolsTable } = particulate;
const Form = SearchForm(searchConfig);
const Table = createStandardToolsTable(tableConfig, null, {
  deleteStatus: false,
});
const Page = StandardPage(Form, Table);

@connect(
  ({}) => ({}),
  {
    getList: action.getList,
  }
)
class List extends Component {
  static contextTypes = {
    author: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      dataSource: {
        total: 0,
        data: [],
      },
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
    let type = '';
    if (time) {
      fields.endOrderTime = time.end ? moment(time.end).format('YYYY-MM-DD 23:59:59') : undefined;
      fields.startOrderTime = time.start
        ? moment(time.start).format('YYYY-MM-DD 00:00:00')
        : undefined;
    }

    if (this.context.author.system === ENTERPRISE.platform) {
      type = '2,3';
    } else if (this.context.author.system === STORE.platform) {
      type = '1';
    }

    const dataSource = await this.props.getList({
      ...fields,
      ...params,
      type,
    });
    this.setState({ dataSource });
  }

  renderTools = () => {
    return <Authorized />;
  };

  renderAction(value, record) {
    return (
      <Authorized>
        {(record.state || '11').toString() === '11' ? (
          <a onClick={() => this.edit(record.id)}>立即充值</a>
        ) : (
          <a onClick={() => this.view(record.id)}>订单详情</a>
        )}
      </Authorized>
    );
  }

  render() {
    const {
      dataSource: { total, data },
    } = this.state;

    return (
      <Page
        getPage={saveRef(this, 'page')}
        tableContext={{
          renderAction: (...arg) => this.renderAction(...arg),
        }}
        defaultExpandAllRows
        fetchList={(...arg) => this.fetchList(...arg)}
        renderTools={this.renderTools()}
        dataSource={data}
        total={total || 0}
      />
    );
  }
}

export default List;
