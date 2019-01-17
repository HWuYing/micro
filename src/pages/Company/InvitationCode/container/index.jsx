import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reducer } from '@applyStore';
import { particulate, Authorized, RejectModal } from '@components';
import { BasicPage } from '@pageModel';
import { component } from '@particulate';
import { reducers, action } from '../../store';
import formConfig from '../config/form.config';

const { saveRef } = component;
const { createForm } = particulate;
const Page = BasicPage(createForm(formConfig), {
  style: { marginRight: '20%' },
});

@connect(({companyManage: { invitationCode }}) => ({ invitationCode }), {
  getInvitationCode: action.getInvitationCode,
})
@reducer('companyManage', reducers)
class InvitationCode extends Component {
  componentDidMount() {
    const { getInvitationCode, userInfo: { companyId } } = this.props;
    getInvitationCode({ companyId });
  }

  onClose() {
    const { $util: { closeAndSwitch }, pageTitle, fromMenu: {
      fromTitle,
    }} = this.props;
    closeAndSwitch(pageTitle, fromTitle);
  }



  render() {
    const { invitationCode } = this.props;
    const { distributeFlag=2 } = invitationCode;
    return (
      <Page
        author={{ distributeFlag: distributeFlag.toString() }}
        layout="inline"
        fieldsStore={invitationCode}
        getForm={saveRef(this, 'form')}
        onSubmit={(...arg) => this.onSubmit(...arg)}
      />
    );
  }
}

export default InvitationCode;
