import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Button } from 'antd';
import { reducer } from '@applyStore';
import { particulate, Authorized, RejectModal } from '@components';
import { BasicPage } from '@pageModel';
import { component } from '@particulate';
import { PAGE_EDIT_TYPE, PROJECT_CONFIG } from '@common/config';
import { reducers, action } from '../../store';
import formConfig from '../config/form.config';

const { saveRef } = component;
const { createForm } = particulate;
const Page = BasicPage(createForm(formConfig), {
  style: { maxWidth: '600px' },
});

@connect(() => ({}), {
  getDetail: action.getMarketingDirectorDetail,
  saveMarketingDirector: action.saveMarketingDirector,
})
@reducer('marketingDirector', reducers)
class MarketingDirectorEdit extends Component {
  constructor(props, context) {
    super(props, context);
    const { editType } = props;
    this.enumObj = PAGE_EDIT_TYPE[Object.keys(PAGE_EDIT_TYPE).filter((key) => PAGE_EDIT_TYPE[key].value === editType)[0]];
    this.state = {
      detail: {},
    };
  }

  componentDidMount() {
    const {  match: { params }, getDetail } = this.props;
    getDetail({ ...params }).then(({ data }) => {
      this.setState({
        detail: data,
      });
    });
  }

  async onSubmit(fields) {
    const { saveMarketingDirector, $util: { closeAndSwitchRefresh }, pageTitle, fromMenu: {
      fromTitle,
    }} = this.props;
    const { detail } = this.state;
    const { resultMsg } = await saveMarketingDirector({
      ...detail,
      ...fields,
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
    const { detail } = this.state;
    const { enumObj } = this;
    const author = { editType: enumObj.value };
    return (
      <Page
        layout="inline"
        fieldsStore={detail}
        getForm={saveRef(this, 'form')}
        rootContext={{...author}}
        author={author}
        onSubmit={(...arg) => this.onSubmit(...arg)}
      >
        <Authorized target="div" style={{textAlign: 'center'}} author={{ type: enumObj.value }}>
          <Button style={{marginRight: '10px'}} onClick={() => this.onClose()}>返回</Button>
          <Button type="primary" style={{marginRight: '10px'}} onClick={() => this.form.onSubmit()}>
            提交
          </Button>
        </Authorized>
      </Page>
    );
  }
}

export default MarketingDirectorEdit;
