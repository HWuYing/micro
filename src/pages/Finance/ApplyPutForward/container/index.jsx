import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, message } from 'antd';
import { BasicPage } from '@pageModel';
import { particulate, RejectModal, Authorized } from '@components';
import { component } from '@particulate';
import { reducer } from '@applyStore';
import { PROJECT_CONFIG } from '@common/config';
import { moneyToYuan, typeToLabel, yuanToMoney } from '@tools';
import { COMMISSION_STATUS, COMMISSION_AUDIT_STATUS, IS_MARKETING_DIRECTOR } from '../../enum';
import { formConfig } from '../config';
import { reducers, action } from '../../store';

const { createForm } = particulate;
const { saveRef } = component;
const Page = BasicPage(createForm(formConfig), {
  style: { maxWidth: '700px' },
});

@connect(({ financeManage: { statistics } }) => ({ statistics }), {
  getDetail: action.getWithdrawDetail,
  applyWithdraw: action.applyWithdraw,
  auditStoreWithdraw: action.auditStoreWithdraw,
})
@reducer('financeManage', reducers)
class ApplyPutForward extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      details: {},
    };
  }

  componentDidMount() {
    const { isApply, match: { params }, getDetail } = this.props;
    getDetail(isApply ? { id: 0 } : params).then(({ data }) => {
      const { province, provinceCode, city, cityCode, amount } = data;
      this.setState({
        details: {
          ...data,
          region: provinceCode ? [
            { id: provinceCode, name: province },
            { id: cityCode, name: city },
          ] : [],
          amount: moneyToYuan(amount, ''),
        },
      });
    });
  }

  async onSubmit(fields) {
    const { applyWithdraw, $util: { closeAndSwitchRefresh }, pageTitle, fromMenu: {
      fromTitle,
      pathname,
    }={} } = this.props;
    const { region:[province={}, city={}]=[], amount } = fields;
    const params = {
      ... fields,
      province: province.name,
      provinceCode: province.id,
      city: city.name,
      cityCode: city.id,
      amount: yuanToMoney(amount),
      region: undefined,
    };
    const { resultMsg } = await applyWithdraw(params);
    message.success(resultMsg);
    closeAndSwitchRefresh(pageTitle, {
      name: fromTitle,
      path: `${pathname}?enumKey=WAIT`,
    });
  }

  onClose() {
    const { $util: { closeAndSwitch }, pageTitle, fromMenu: {
      fromTitle,
    }} = this.props;
    closeAndSwitch(pageTitle, fromTitle);
  }

  async auditStoreWithdraw(enumKey, statusFlag, mergeFields) {
    const { auditStoreWithdraw, $util: { closeAndSwitchRefresh }, pageTitle, fromMenu: {
      fromTitle,
      pathname,
    } = {}} = this.props;
    const { details } = this.state;
    const { resultMsg } = await auditStoreWithdraw({
      id: details.id,
      resultFlag: statusFlag,
      ...mergeFields,
    });
    message.success(resultMsg);
    closeAndSwitchRefresh(pageTitle, {
      name: fromTitle,
      path: `${pathname}?enumKey=${enumKey}`,
    });
  }

  renderApplyQuota(props, decoratorNode, fileEle, form) {
    const { statistics: { availableAmount }, isApply } = this.props;
    return (
      <Fragment>
        <div className="flex">
          { decoratorNode(fileEle({ form }))}
          <Authorized author={{ isApply }}>
            <div author={{ isApply: true }} style={{ fontWeight: 'bold', fontSize: '18px', whiteSpace: 'nowrap' }}>
              <span>可提现金额:</span>
              <span>{ moneyToYuan(availableAmount, '0') }</span>
            </div>
          </Authorized>
        </div>
        <Authorized author={{ isApply }}>
          <div author={{ isApply: true }}>
            平台每个月处理2次提现申请，最终到账时间以财务结算后银行转账时间为准。
          </div>
        </Authorized>
      </Fragment>
    );
  }

  render() {
    const { details } = this.state;
    const { isApply, userInfo: { isMarketingDirector } } = this.props;
    const { state } = details;
    const fieldsStore = {
      state: typeToLabel(state, COMMISSION_STATUS),
    };
    return (
      <Page
        layoutCol="1"
        getForm={saveRef(this, 'form')}
        rootContext={{
          state,
          isApply,
          renderApplyQuota: (...arg) => this.renderApplyQuota(...arg),
        }}
        author={{ isApply, type: state && state.toString() }}
        onSubmit={(...arg) => this.onSubmit(...arg)}
        fieldsStore={{ ...details, ...fieldsStore }}
      >
        <Row>
          <Col span={6} />
          <Col span={18}>
            <Authorized author={{ type: state && state.toString(), isApply, isMarketingDirector: isMarketingDirector && isMarketingDirector.toString() }}>
              <Button
                htmlType="submit"
                type="primary"
                author={[{
                  '!system': PROJECT_CONFIG.ERP.platform,
                  isApply: true,
                }, {
                  system: PROJECT_CONFIG.ERP.platform,
                  isMarketingDirector: IS_MARKETING_DIRECTOR.YES.value,
                  isApply: true,
                }]}
                onClick={() => this.form.onSubmit()}
              >
                发起提现
              </Button>
              <Button
                type="primary"
                style={{margin: '0 10px'}}
                author={{
                  type: COMMISSION_STATUS.WAIT.value,
                  system: PROJECT_CONFIG.ERP.platform,
                  '!isMarketingDirector': IS_MARKETING_DIRECTOR.YES.value,
                }}
                onClick={() => this.auditStoreWithdraw('ADOPT', COMMISSION_AUDIT_STATUS.ADOPT.value)}
              >
                审核通过
              </Button>
              <RejectModal
                title="不通过理由"
                refusalKey="remark"
                author={{
                  type: COMMISSION_STATUS.WAIT.value,
                  system: PROJECT_CONFIG.ERP.platform,
                }}
                onConfirm={(fields) => this.auditStoreWithdraw('AUDIT_FAIL', COMMISSION_AUDIT_STATUS.REFUSE.value, fields)}
              >
                <Button type="primary">审核不通过</Button>
              </RejectModal>
              <Button style={{ marginLeft: '10px' }} onClick={() => this.onClose()}>
                返回
              </Button>
            </Authorized>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default ApplyPutForward;
