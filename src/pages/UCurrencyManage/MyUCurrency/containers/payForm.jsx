import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Divider } from 'antd';
import { PageLayout } from '@layouts';
import * as rexRules from '@tools';
import { component } from '@particulate';
import { particulate } from '@components';
import FormItem from '@components/particulate/Form/FormItem';
import { moneyToYuan, yuanToMoney } from '@tools';
import * as action from '../../store/action/index';
import formConfig from '../config/payForm.config';

const { saveRef } = component;
const { createForm } = particulate;
const Form = createForm(formConfig);

@connect(
  ({}) => ({}),
  {
    recharge: action.recharge,
  }
)
class Edit extends Component {
  constructor(props, context) {
    super(props, context);
  }

  async onSubmit(fields) {
    const {
      $util: { closeAndOpen },
    } = this.props;

    const res = await this.props.recharge({
      ...fields,
      num: Number(fields.num || 0) * 100,
    });
    const { id } = res.data;

    closeAndOpen('立即充值', {
      name: '支付详情',
      path: `/payment/ucurreny-pay-detail/${id}`,
    });
  }

  closeEdit() {
    const { pageTitle } = this.props;
    this.props.$util.closeAndSwitch(pageTitle, '我的U币');
  }

  renderUcurrency(props, decoratorNode, fileEle, form) {
    const {
      match: {
        params: { exchange },
      },
    } = this.props;
    const { num } = form.getFieldsValue();
    const payableAmount =(Number(num || 0) * 100 / Number(exchange)).toFixed(2);
    return (
      <Fragment>
        {FormItem({
          label: '购买U币数',
          labelStyle: { width: '120px' },
          decorator: {
            entry: {
              key: 'input',
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
            payableAmount: `¥${payableAmount || 0}`,
          },
        })}
      </Fragment>
    );
  }

  renderDecr(props, decoratorNode, fileEle, form) {
    const { type } = form.getFieldsValue();

    if ((type || 1).toString() === '1') return null;

    return (
      <Fragment>
        {FormItem({
          label: '代充装企',
          labelStyle: { width: '120px' },
          decorator: {
            entry: {
              key: 'connectSelect',
              showSearch: true,
              labelName: 'name',
              valueName: 'id',
              placeholder: '请输入',
              serviceApi: 'queryDecrList',
              storeKey: 'decrListEnum',
              mappingTo: 'children',
              filterOption: (input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
            },
            filedDecorator: {
              key: 'companyId',
            },
          },
          form,
          isLine: true,
          // fieldsStore: {},
        })}
      </Fragment>
    );
  }

  render() {
    const {
      match: {
        params: { oldNum },
      },
    } = this.props;

    return (
      <PageLayout>
        <Form
          style={{ marginLeft: '30px', width: '75%' }}
          layoutCol="1"
          layout="inline"
          labelStyle={{ width: '120px' }}
          getForm={saveRef(this, 'form')}
          fieldsStore={{
            oldNum: Number(oldNum || 0) / 100,
            paymentType: '1',
            type: '1',
          }}
          rootContext={{
            renderUcurrency: (...arg) => this.renderUcurrency(...arg),
            renderDecr: (...arg) => this.renderDecr(...arg),
          }}
          onSubmit={(...arg) => this.onSubmit(...arg)}
        >
          <div style={{ textAlign: 'center', paddingTop: '100px' }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Divider type="vertical" />
            <Button onClick={() => this.closeEdit()}>取消</Button>
          </div>
        </Form>
      </PageLayout>
    );
  }
}

export default Edit;
