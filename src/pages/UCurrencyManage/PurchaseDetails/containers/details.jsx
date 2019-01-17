import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { PageLayout } from '@layouts';
import { component } from '@particulate';
import { particulate } from '@components';
import * as action from '../../store/action/index';
import { formConfig } from '../config';
import { STATUA_ENUM, PAY_TYPE_ENUM } from '../../store/constant/index';

const { saveRef } = component;
const { createForm } = particulate;
const Form = createForm(formConfig);

@connect(
  ({}) => ({}),
  {
    getDetails: action.detail,
  }
)
class Edit extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      dataSource: {},
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      getDetails,
    } = this.props;

    const dataSource = await getDetails(id);
    const { paymentType, state, payableAmount, num } = dataSource;

    this.setState({
      dataSource: {
        ...dataSource,
        payableAmount: (payableAmount || 0) / 100,
        num: (Number(num) || 0) / 100,
        stateName: STATUA_ENUM[state] ? STATUA_ENUM[state].text : '--',
        orderTypeName: 'U币充值',
        paymentTypeName: PAY_TYPE_ENUM[paymentType] ? PAY_TYPE_ENUM[paymentType].text : '--',
      },
    });
  }

  closeEdit() {
    const {
      pageTitle,
      fromMenu: { fromTitle },
    } = this.props;

    this.props.$util.closeAndSwitch(pageTitle, fromTitle);
  }

  render() {
    const { dataSource } = this.state;

    return (
      <PageLayout>
        <Form
          style={{ marginLeft: '30px', width: '75%' }}
          layoutCol="1"
          layout="inline"
          getForm={saveRef(this, 'form')}
          fieldsStore={dataSource}
          rootContext={{}}
        >
          <div style={{ textAlign: 'center', paddingTop: '100px' }}>
            <Button onClick={() => this.closeEdit()}>取消</Button>
          </div>
        </Form>
      </PageLayout>
    );
  }
}

export default Edit;
