import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, message } from 'antd';
import PageLayout from '@layouts/PageLayout';
import { component } from '@particulate';
import { ActionComponent } from '@applyComponent';
import { Authorized } from '@components';
import { reducer } from '@applyStore';
import CompanyCommissionProportion from '../../components/CompanyCommissionProportion/container';
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
class CompanyCommissionConfig extends PureComponent {
  componentDidMount() {
    const { companyConfig: { decorConfigList=[], configList } = {} } = this.props;
    this.company.parseDetails(configList || decorConfigList);
  }

  async onSubmit() {
    let companyStatus;
    const { companyConfig, mergeCompanyConfig } = this.props;
    if (companyStatus=this.company.validate()) {
      const { resultMsg } = await mergeCompanyConfig({
        id: companyConfig.id,
        configList: companyStatus,
      });
      message.success(resultMsg);
    }
  }

  render() {
    return (
      <PageLayout>
        <CompanyCommissionProportion
          {...this.props}
          getRef={saveRef(this, 'company')}
        />
        <Authorized target="div" style={{marginLeft: '20px'}}>
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

export default CompanyCommissionConfig;
