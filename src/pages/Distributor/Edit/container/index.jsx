import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Button } from 'antd';
import { reducer } from '@applyStore';
import { particulate, Authorized, RejectModal } from '@components';
import { BasicPage } from '@pageModel';
import { component } from '@particulate';
import { PAGE_EDIT_TYPE, PROJECT_CONFIG } from '@common/config';
import { DISTRIBUTOR_STATUS } from '../../enum';
import { reducers, action } from '../../store';
import formConfig from '../config/form.config';

const { saveRef } = component;
const { createForm } = particulate;
const Page = BasicPage(createForm(formConfig), {
  style: { marginRight: '20%' },
});

@connect(() => ({}), {
  getDetail: action.getDetail,
  audit: action.audit,
})
@reducer('distributorManage', reducers)
class MenuEdit extends Component {
  constructor(props, context) {
    super(props, context);
    const { editType } = props;
    this.enumObj = PAGE_EDIT_TYPE[Object.keys(PAGE_EDIT_TYPE).filter((key) => PAGE_EDIT_TYPE[key].value === editType)[0]];
    this.state = {
      details: {},
    };
  }

  componentDidMount() {
    const {  match: { params }, getDetail } = this.props;
    getDetail({ ...params }).then(({ data }) => {
      this.setState({
        details: data,
      });
    });
  }

  async onStatusFlag(toState, mergeFields) {
    const { audit, $util: { closeAndSwitchRefresh }, pageTitle, fromMenu: {
      fromTitle,
    }} = this.props;
    const { details } = this.state;
    const { resultMsg } = await audit({
      id: details.id,
      fromState: details.auditStatus,
      toState,
      ...mergeFields,
    });
    message.success(resultMsg);
    closeAndSwitchRefresh(pageTitle, fromTitle);
  }

  onClose() {
    const { $util: { closeAndSwitch }, pageTitle, fromMenu: {
      fromTitle,
    }} = this.props;
    closeAndSwitch(pageTitle, fromTitle);
  }

  render() {
    const { details } = this.state;
    const { enumObj } = this;
    return (
      <Page
        layout="inline"
        fieldsStore={details}
        getForm={saveRef(this, 'form')}
        rootContext={{ enumObj }}
        onSubmit={(...arg) => this.onSubmit(...arg)}
      >
        <Authorized target="div" style={{textAlign: 'center'}} author={{ type: enumObj.value }}>
          <Button style={{marginRight: '10px'}} onClick={() => this.onClose()}>返回</Button>
          <Button
            type="primary"
            style={{marginRight: '10px'}}
            author={{
              system: PROJECT_CONFIG.ERP.platform,
              type: PAGE_EDIT_TYPE.AUDIT.value,
            }}
            onClick={() => this.onStatusFlag(DISTRIBUTOR_STATUS.THROUGH_AUDIT.value)}
          >
            审核通过
          </Button>
          <RejectModal
            author={{
              type: PAGE_EDIT_TYPE.AUDIT.value,
              system: PROJECT_CONFIG.ERP.platform,
            }}
            title="不通过理由"
            style={{marginRight: '10px'}}
            refusalKey="notes"
            onConfirm={(fields) => this.onStatusFlag(DISTRIBUTOR_STATUS.FAILURE_AUDIT.value, fields)}
          >
            <Button type="primary">审核不通过</Button>
          </RejectModal>
        </Authorized>
      </Page>
    );
  }
}

export default MenuEdit;
