import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as rexRules from '@tools';
import { Button, Divider, message } from 'antd';
import { PageLayout } from '@layouts';
import { component } from '@particulate';
import FormItem from '@components/particulate/Form/FormItem';
import { particulate, Popconfirm } from '@components';
import { moneyToYuan, yuanToMoney } from '@tools';
import * as action from '../../store/action/index';
import { getDetailDecor } from '../../../Company/store/action';
import formConfig from '../config/recharge.config';

const { saveRef } = component;
const { createForm } = particulate;
const Form = createForm(formConfig);

@connect(
  ({}) => ({}),
  {
    getDetails: getDetailDecor,
    transfer: action.transfer,
    getExchangeDetails: action.exchangeDetail,
  }
)
class Edit extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      dataSource: {},
    };

    this.currentValue = 0;
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      getDetails,
      getExchangeDetails,
    } = this.props;
    const [res, res1] = await Promise.all([getExchangeDetails(), getDetails({ id })]);
    console.log(res);
    const { data } = res1;
    this.setState({
      dataSource: {
        ...data,
        ...res,
      },
    });
  }

  onSubmit() {
    const { dataSource } = this.state;
    this.form.validateFields((err, fields) => {
      if (err) return;
      const { id } = dataSource;
      const { num } = fields;
      console.log(num);
      this.submit({
        companyId: id,
        paymentType: 12, // pos 支付
        num: Number(num),
      });
    });
  }

  async submit(data) {
    await this.props.transfer({
      ...data,
      num: Number(data.num || 0) * 100,
    });

    message.success('充值成功！');
    this.closeEdit();
  }

  closeEdit() {
    const {
      pageTitle,
      fromMenu: { fromTitle },
    } = this.props;

    this.props.$util.closeAndSwitch(pageTitle, fromTitle);
  }

  onChangeU(value) {
    const {
      dataSource: { exchange },
    } = this.state;

    this.currentValue = value * exchange;
  }

  renderUcurrency(props, decoratorNode, fileEle, form) {
    const {
      dataSource: { coinExchange },
    } = this.state;

    const { num } = form.getFieldsValue();
    const payableAmount =(Number(num || 0) / Number(coinExchange || 1.5)).toFixed(2);

    return (
      <Fragment>
        {FormItem({
          label: '购买U币数',
          labelStyle: { width: '120px' },
          decorator: {
            entry: {
              key: 'input',
              onChange: (...arg) => this.onChangeU(...arg),
            },
            filedDecorator: {
              key: 'num',
              rules: [rexRules.inputRequired],
            },
          },
          form,
          isLine: true,
          fieldsStore: {
            num: num || '',
          },
        })}
        {FormItem({
          label: '应付总额',
          labelStyle: { width: '120px' },
          decorator: {
            entry: {
              key: 'text',
            },
            filedDecorator: {
              key: 'payableAmount',
            },
          },
          form,
          isLine: true,
          fieldsStore: {
            payableAmount: `¥ ${payableAmount}`,
          },
        })}
      </Fragment>
    );
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
            renderUcurrency: (...arg) => this.renderUcurrency(...arg),
          }}
          // onSubmit={(...arg) => this.onSubmit(...arg)}
        >
          <div style={{ textAlign: 'center', paddingTop: '100px' }}>
            <Popconfirm
              placement="top"
              title={`是否给 ${dataSource.name} 充值U币, 确认后不可撤销!`}
              onConfirm={() => this.onSubmit()}
              okText="确认"
              cancelText="取消"
              style={{ marginRight: '10px' }}
            >
              <Button style={{ marginRight: '10px' }} type="primary">
                提交
              </Button>
            </Popconfirm>

            <Button onClick={() => this.closeEdit()}>取消</Button>
          </div>
        </Form>
      </PageLayout>
    );
  }
}

export default Edit;
