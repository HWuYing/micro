import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Divider, message } from 'antd';
import { reducer } from '@applyStore';
import { particulate, Authorized } from '@components';
import { createStandard } from '@model';
import { createFormModal } from '@modalModel';
import { BasicPage } from '@pageModel';
import { component } from '@particulate';
import { reducers, action } from '../../store';
import { formConfig, tableConfig } from '../config';
import styles from './index.less';

const { saveRef } = component;
const { createPaginationToolsTable, createForm } = particulate;
const Page = BasicPage(createStandard(undefined, createPaginationToolsTable(tableConfig, false)));
const ResetProportionModal = createFormModal(createForm(formConfig), {
  title: '重设比例',
  destroyOnClose: true,
  width: 600,
});

@connect(({ marketingDirector: { relationServiceProviderList } }) => ({ relationServiceProviderList }), {
  getList: action.getRelationServiceProviderList,
  fireBindMarketingProvider: action.fireBindMarketingProvider,
  changeDistrictRate: action.changeDistrictRate,
})
@reducer('marketingDirector', reducers)
class MarketingDirectorList extends PureComponent{
  constructor(props, context) {
    super(props, context);
    this.fetchListBind = this.fetchList.bind(this);
    this.onResetProportionBind = this.onResetProportion.bind(this);
    this.state = {
      checkedRecord: {},
    };
    this.currentField = {};
  }

  onShowModal(record) {
    this.setState({
      checkedRecord: record,
    }, () => {
      this.resetProportionModal.onShow(true);
      setTimeout(() => this.resetProportionForm.setFormFieldsValue(record))
    });
  }

  async onResetProportion(fields) {
    const { checkedRecord } = this.state;
    const { changeDistrictRate } = this.props;
    const { resultMsg } = await changeDistrictRate({
      id: checkedRecord.id,
      ...fields,
    });
    message.success(resultMsg);
    await this.fetchList(this.currentField);
  }

  async fetchList(fields) {
    const { getList, match: { params: { id } } } = this.props;
    this.currentField = fields;
    console.log(id);
    await getList({
      ...fields,
      marketingDirectorId: id,
    });
  }

  async fireBind(record) {
    const { fireBindMarketingProvider } = this.props;
    const { resultMsg } = await fireBindMarketingProvider({ ...record });
    message.success(resultMsg);
    await this.fetchList(this.currentField);
  }

  renderAction(value, record) {
    return (
      <Authorized>
        <a onClick={() => this.onShowModal(record)}>重设比例</a>
        <Divider type="vertical" />
        <a onClick={() => this.fireBind(record)}>脱离关联</a>
      </Authorized>
    );
  }

  render() {
    const { relationServiceProviderList: { list, total } } = this.props;
    const { checkedRecord } = this.state;
    return (
      <Fragment>
        <Page
          columnsRender={{
            action: (...arg) => this.renderAction(...arg),
          }}
          dataSource={list}
          total={total}
          fetchList={this.fetchListBind}
        />
        <ResetProportionModal
          layout="inline"
          layoutCol="1"
          className={styles['reset-proportion-modal']}
          fieldsStore={checkedRecord}
          getForm={saveRef(this, 'resetProportionForm')}
          getModal={saveRef(this, 'resetProportionModal')}
          onOk={this.onResetProportionBind}
        />
      </Fragment>
    )
  }
}

export default MarketingDirectorList;
