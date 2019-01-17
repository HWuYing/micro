import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider, message, Button } from 'antd';
import PageLayout from '@layouts/PageLayout';
import { reducer } from '@applyStore';
import { particulate, Authorized, RejectModal } from '@components';
import { component } from '@particulate';
import { typeToLabel } from '@tools';
import { PROJECT_CONFIG } from '@common/config';
import { reducers, action } from '../../store';
import formConfig from '../config/form.config';
import { COMMISSION_STATUS } from '../../enum';

const { saveRef } = component;
const { createForm } = particulate;
const Form = createForm(formConfig);

@connect(() => ({}), {
  getWithdrawDetail: action.getWithdrawDetail,
  auditWithdraw: action.auditWithdraw,
})
@reducer('distributorManage', reducers)
class MenuEdit extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      details: {},
    };
  }

  componentDidMount() {
    const {  match: { params }, getWithdrawDetail } = this.props;
    getWithdrawDetail(params).then(({ data }) => {
      this.setState({
        details: data,
      });
    });
  }

  async onStatusFlag(toState, mergeFields, toEnumKey) {
    const { auditWithdraw, $util: { closeAndSwitchRefresh }, pageTitle, fromMenu: {
      fromTitle,
      pathname,
    }} = this.props;
    const { details } = this.state;
    const { resultMsg } = await auditWithdraw({
      withdrawId: details.id,
      fromState: details.status,
      toState,
      ...mergeFields,
    });
    message.success(resultMsg);
    closeAndSwitchRefresh(pageTitle, {
      name: fromTitle,
      path: `${pathname}?enumKey=${toEnumKey}`,
    });
  }

  onClose() {
    const { $util: { closeAndSwitch }, pageTitle, fromMenu: {
      fromTitle,
    }} = this.props;
    closeAndSwitch(pageTitle, fromTitle);
  }

  render() {
    const { details } = this.state;
    const { id, status, withdrawAmount } = details;
    return (
      <PageLayout>
        <div className="flex flex-row" style={{maxWidth: '750px'}}>
          <div>
            <span>申请单号：</span>
            <span>{id}</span>
          </div>
          <div style={{margin: '0 80px'}}>
            <span>状态：</span>
            <span>{typeToLabel(status, COMMISSION_STATUS)}</span>
          </div>
          <div>
            <span>金额：</span>
            <span>{withdrawAmount ? Number(withdrawAmount) / 100 : '暂无数据'}</span>
          </div>
        </div>
        <Divider />
        <div style={{maxWidth: '750px'}}>
          <Form
            layout="inline"
            layoutCol="2"
            fieldsStore={details}
            getForm={saveRef(this, 'form')}
            onSubmit={(...arg) => this.onSubmit(...arg)}
          >
            <Authorized author={{type: status && status.toString()}} target="div" style={{marginTop: '50px', textAlign: 'center'}}>
              <Button style={{marginRight: '10px'}} onClick={() => this.onClose()}>返回</Button>
              <Button
                type="primary"
                style={{marginRight: '10px'}}
                author={{
                  type: COMMISSION_STATUS.WAIT.value,
                }}
                onClick={() => this.onStatusFlag(COMMISSION_STATUS.ADOPT.value, undefined, 'ADOPT')}
              >
                审核通过
              </Button>
              <RejectModal
                title="审核失败"
                refusalKey="notes"
                author={{
                  type: COMMISSION_STATUS.WAIT.value,
                }}
                onConfirm={(fields) => this.onStatusFlag(COMMISSION_STATUS.REFUSE.value, fields, 'REFUSE')}
              >
                <Button type="primary">审核失败</Button>
              </RejectModal>
              <Button
                author={{
                  type: COMMISSION_STATUS.ADOPT.value,
                }}
                type="primary"
                style={{marginLeft: '10px'}}
                onClick={() => this.onStatusFlag(COMMISSION_STATUS.SUCCESS.value, undefined, 'SUCCESS')}
              >
                已打款
              </Button>
            </Authorized>
          </Form>
        </div>
      </PageLayout>
    );
  }
}

export default MenuEdit;
