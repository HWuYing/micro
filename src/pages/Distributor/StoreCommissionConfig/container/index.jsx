import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, message } from 'antd';
import PageLayout from '@layouts/PageLayout';
import { component } from '@particulate';
import { ActionComponent } from '@applyComponent';
import { Authorized } from '@components';
import { reducer } from '@applyStore';
import StoreCommissionProportion from '../../components/StoreCommissionProportion/container';
import { action, reducers } from '../../store';

const { saveRef } = component;

@connect(({ distributorManage: { companyConfig } }) => ({ companyConfig }), {
  getCompanyConfig: action.getCompanyConfig,
  mergeCompanyConfig: action.mergeCompanyConfig,
})
@reducer('distributorManage', reducers)
@ActionComponent(async context => {
  const { dispatch } = context;
  await dispatch(action.getCompanyConfig({}, context));
})
class StoreCommissionConfig extends PureComponent {
  componentDidMount() {
    const { companyConfig: { storeConfigList=[], configList } = {} } = this.props;
    this.store.parseDetails(configList || storeConfigList);
  }

  async onSubmit() {
    let storeStatus;
    const { companyConfig, mergeCompanyConfig } = this.props;
    if (storeStatus=this.store.validate()) {
      const { resultMsg } = await mergeCompanyConfig({
        id: companyConfig.id,
        configList: storeStatus,
      });
      message.success(resultMsg);
    }
  }

  render() {
    return (
      <PageLayout style={{ overflowX: 'hidden' }}>
        <StoreCommissionProportion
          {...this.props}
          getRef={saveRef(this, 'store')}
        />
        <Authorized target="div" style={{ textAlign: 'center' }}>
          <Button
            type="primary"
            style={{marginLeft: '10px'}}
            onClick={() => this.onSubmit()}
          >
            提交
          </Button>
        </Authorized>
      </PageLayout>
    );
  }
}

export default StoreCommissionConfig;
