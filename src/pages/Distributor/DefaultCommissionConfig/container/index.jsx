import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, message } from 'antd';
import PageLayout from '@layouts/PageLayout';
import { component } from '@particulate';
import { ActionComponent } from '@applyComponent';
import { Authorized } from '@components';
import { reducer } from '@applyStore';
import StoreCommissionProportion from '../../components/StoreCommissionProportion/container';
import CompanyCommissionProportion from '../../components/CompanyCommissionProportion/container';
import { action, reducers } from '../../store';

const { saveRef } = component;

@connect(({ distributorManage: { defConfig } }) => ({ defConfig }), {
  getDefConfig: action.getDefConfig,
  mergeDefConfig: action.mergeDefConfig,
})
@reducer('distributorManage', reducers)
@ActionComponent(async context => {
  const { dispatch } = context;
  await dispatch(action.getDefConfig({}, context));
})
class DefaultCommissionConfig extends PureComponent {
  componentDidMount() {
    const { defConfig: { decorConfigList=[], storeConfigList=[] } = {} } = this.props;
    this.store.parseDetails(storeConfigList);
    this.company.parseDetails(decorConfigList);
  }

  async onSubmit() {
    let storeStatus;
    let companyStatus;
    const { defConfig, mergeDefConfig } = this.props;
    if ((storeStatus=this.store.validate()) && (companyStatus=this.company.validate())) {
      const { resultMsg } = await mergeDefConfig({
        id: defConfig.id,
        storeConfigList: storeStatus,
        decorConfigList: companyStatus,
      });
      message.success(resultMsg);
    }
  }

  render() {
    return (
      <PageLayout style={{ overflowX: 'hidden' }}>
        <StoreCommissionProportion {...this.props} getRef={saveRef(this, 'store')}/>
        <CompanyCommissionProportion {...this.props} getRef={saveRef(this, 'company')}/>
        <Authorized target="div" style={{ textAlign: 'center' }}>
          <Button
            type="primary"
            style={{ marginLeft: '10px' }}
            onClick={() => this.onSubmit()}
          >
            提交
          </Button>
        </Authorized>
      </PageLayout>
    );
  }
}

export default DefaultCommissionConfig;
