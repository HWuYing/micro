import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { reducer } from '@applyStore';
import { particulate, Authorized } from '@components';
import { BasicPage } from '@pageModel';
import { component } from '@particulate';
import { typeToLabel } from '@tools';
import { PAYMENT_TYPE, EARNINGS_INCOME_TYPE, ORDER_TYPE } from '../../enum';
import { reducers, action } from '../../store';
import formConfig from '../config/form.config';

const { saveRef } = component;
const { createForm } = particulate;
const Page = BasicPage(createForm(formConfig), {
  style: { maxWidth: '700px' },
});

@connect(() => ({}), {
  getIncomeDetail: action.getIncomeDetail,
})
@reducer('financeManage', reducers)
class EarningsInfo extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      detail: {},
    };
  }

  componentDidMount() {
    const {  match: { params }, getIncomeDetail } = this.props;
    getIncomeDetail({ ...params }).then(({ data }) => {
      this.setState({
        detail: data,
      });
    });
  }

  onClose() {
    const { $util: { closeAndSwitch }, pageTitle, fromMenu: {
      fromTitle,
    }} = this.props;
    closeAndSwitch(pageTitle, fromTitle);
  }

  render() {
    const { detail } = this.state;
    const { incomeType, paymentType, orderType, incomeAmount, orderAmount } = detail;
    const fieldsStore = {
      ...detail,
      incomeAmount: incomeAmount ? Number(incomeAmount) / 100 : '--',
      orderAmount: orderAmount ? Number(orderAmount) / 100 : '--',
      incomeType: typeToLabel(incomeType, EARNINGS_INCOME_TYPE),
      paymentType: typeToLabel(paymentType, PAYMENT_TYPE),
      orderType: typeToLabel(orderType, ORDER_TYPE),
    };
    return (
      <Page
        layout="inline"
        fieldsStore={fieldsStore}
        getForm={saveRef(this, 'form')}
        onSubmit={(...arg) => this.onSubmit(...arg)}
      >
        <Authorized target="div" style={{marginLeft: '15px'}}>
          <Button onClick={() => this.onClose()}>返回</Button>
        </Authorized>
      </Page>
    );
  }
}

export default EarningsInfo;
