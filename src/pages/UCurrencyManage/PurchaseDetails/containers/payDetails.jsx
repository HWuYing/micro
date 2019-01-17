import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Divider } from 'antd';
import { SearchForm, Authorized, particulate } from '@components';
import { StandardPage } from '@pageModel';
import { component } from '@particulate';
import * as action from '../../store/action/index';
import { paySearchConfig, payTableConfig } from '../config';

const { saveRef } = component;
const { createStandardToolsTable } = particulate;
const Form = SearchForm(paySearchConfig);
const Table = createStandardToolsTable(payTableConfig, null, {
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
    if (time) {
      fields.endOrderTime = time.end;
      fields.startOrderTime = time.start;
    }

    const dataSource = await this.props.getList({
      ...fields,
      ...params,
      type: '3',
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
