import React, { Component } from 'react';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';
import { PROJECT_CONFIG } from '@common/config';
import BaseForm from './containers/form';
import PurchaseDetail from '../PurchaseDetails/containers/purchaseDetail';
import PayDetails from '../PurchaseDetails/containers/payDetails';

const { ENTERPRISE } = PROJECT_CONFIG;
const TabPane = Tabs.TabPane;

class List extends Component {
  static contextTypes = {
    author: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      activeStatus: '1',
    };
  }

  handleModeChange(activeStatus) {
    this.setState({ activeStatus });
  }

  render() {
    const { activeStatus } = this.state;

    return (
      <Tabs
        size="large"
        style={{ width: '100%' }}
        defaultActiveKey={activeStatus}
        tabPosition="top"
        onChange={(...arg) => this.handleModeChange(...arg)}
      >
        <TabPane
          tab="我的U币"
          key="1"
          style={{ display: 'flex', flexWrap: 'wrap', height: 'calc(100vh - 240px)' }}
        >
          <BaseForm $util={this.props.$util} />
        </TabPane>
        <TabPane
          tab="购买明细"
          key="2"
          style={{ display: 'flex', flexWrap: 'wrap', height: 'calc(100vh - 240px)' }}
        >
          <PurchaseDetail $util={this.props.$util} />
        </TabPane>
        {this.context.author.system !== ENTERPRISE.platform ? (
          <TabPane
            tab="支付明细"
            key="3"
            style={{ display: 'flex', flexWrap: 'wrap', height: 'calc(100vh - 240px)' }}
          >
            <PayDetails $util={this.props.$util} />
          </TabPane>
        ) : null}
      </Tabs>
    );
  }
}

export default List;
