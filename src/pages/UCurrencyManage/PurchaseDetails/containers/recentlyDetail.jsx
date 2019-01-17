import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Divider } from 'antd';
import { Authorized, particulate } from '@components';
import { StandardNoFromPage } from '@pageModel';
import { component } from '@particulate';
import * as action from '../../store/action/index';
import { recentlyTableConfig } from '../config';

const { saveRef } = component;
const { createStandardToolsTable } = particulate;
const Table = createStandardToolsTable(recentlyTableConfig, null, {
  deleteStatus: false,
});
const Page = StandardNoFromPage(Table);

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
      state: 21,
    });
    this.setState({ dataSource });
  }

  renderTools = () => {
    return <Authorized />;
  };

  render() {
    const {
      dataSource: { total, data },
    } = this.state;

    return (
      <Page
        getPage={saveRef(this, 'page')}
        tableContext={{}}
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
