import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { PageLayout } from '@layouts';
import { component } from '@particulate';
import { particulate } from '@components';
import * as action from '../../store/action/index';
import formConfig from '../config/detail.config';
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
      getDetails,
      match: {
        params: { id },
      },
    } = this.props;
    const dataSource = await getDetails(id);
    const { paymentType, state, type, name, payableAmount, num } = dataSource;

    this.setState({
      dataSource: {
        ...dataSource,
        typeName: type === 1 ? `自充 ${name || ''}` : `代充 ${name || ''}`,
        stateName: STATUA_ENUM[state] ? STATUA_ENUM[state].text : '--',
        orderTypeName: 'U币充值',
        payableAmount: (payableAmount || 0) / 100,
        num: Number(num) / 100,
        paymentTypeName: PAY_TYPE_ENUM[paymentType] ? PAY_TYPE_ENUM[paymentType].text : '--',
      },
    });
  }

  async onSubmit(fields) {
    const { dataSource } = this.state;

    await this.props.save({
      ...dataSource,
      ...fields,
    });
  }

  renderImageCode() {
    const {
      dataSource: { unionPos, state },
    } = this.state;

    if (unionPos && state.toString() === '11') {
      const { qrcodeImage } = unionPos;
      return (
        <div>
          <img src={qrcodeImage} style={{ width: 200 }} />
          <div>请使用POS机扫码并在POS机商完成支付</div>
        </div>
      );
    }

    return null;
  }

  closeEdit() {
    const { pageTitle } = this.props;
    this.props.$util.closeAndSwitch(pageTitle, '我的U币');
  }

  render() {
    const { dataSource } = this.state;

    return (
      <PageLayout>
        <Form
          style={{ marginLeft: '30px', width: '75%' }}
          layoutCol="1"
          layout="inline"
          labelStyle={{ width: '120px' }}
          getForm={saveRef(this, 'form')}
          fieldsStore={dataSource}
          rootContext={{
            renderImageCode: (...arg) => this.renderImageCode(...arg),
          }}
          // onSubmit={(...arg) => this.onSubmit(...arg)}
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
