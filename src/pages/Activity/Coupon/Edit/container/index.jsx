import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, message } from 'antd';
import { BasicPage } from '@pageModel';
import { particulate } from '@components';
import { component } from '@particulate';
import { reducer } from '@applyStore';
import { valueToString, moneyToYuan, yuanToMoney } from '@tools';
import { SkuSelectModal } from '../../../../../components';
import { reducers, action } from '../../store';
import { formConfig, tableConfig } from '../config';

const { saveRef } = component;
const { createForm, createEditTable } = particulate;
const Page = BasicPage(createForm(formConfig), {
  style: { maxWidth: '800px' },
});
const Table = createEditTable(tableConfig, false);

@connect(() => ({}), {
  getDetail: action.getDetail,
  save: action.save,
})
@reducer('activityCouponManage', reducers)
class CouponEdit extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      details: undefined,
      selectGoodsList: [],
    };
  }

  componentDidMount() {
    const { getDetail, match: { params } } = this.props;
    getDetail(params).then(({ data: details }) => {
      const data = {
        ...details,
        money: valueToString(moneyToYuan(details.money, '')),
        fullSub: valueToString(moneyToYuan(details.fullSub, '')),
        discountRate: valueToString(details.discountRate),
        time: { start: details.startTime, end: details.endTime },
        multiPreferential: (details.multiPreferential || '').split(','),
        brandDataList: (details.brandDataList || []),
        categoryDataList: (details.categoryDataList || []),
      };
      this.setState({ details: data }, () => {
        this.addSkuItem([], details.skuDataList || []);
        this.form.setFormFieldsValue(data);
      });
    });
  }

  async onSubmit(fields) {
    const { details } = this.state;
    const { save, $util: { closeAndSwitchRefresh }, pageTitle, fromMenu: {
      fromTitle,
    }={} } = this.props;
    const { multiPreferential, time = {}, joinType } = fields;
    const { selectGoodsList } = this.state;
    let joinContent;
    let skuDataList;
    const joinTypeAttr = ['categoryDataList', 'brandDataList'][joinType - 1];
    if (joinTypeAttr) {
      joinContent = {
        [joinTypeAttr]: fields[joinTypeAttr].map((item) => ({
          id: item.key || item.value,
          name: item.label,
          ...item,
        })),
      };
    } else {
      skuDataList = selectGoodsList.map(({ id, retailPrice, name }) => ({
        id,
        retailPrice,
        name,
      }));
    }
    const param = {
      id: details.id,
      ...fields,
      multiPreferential: (multiPreferential || []).join(','),
      startTime: time.start,
      endTime: time.end,
      ...joinContent,
      skuDataList,
      money: yuanToMoney(fields.money),
      fullSub: yuanToMoney(fields.fullSub),
      time: undefined,
      queryBrands: undefined,
      goodsClassification: undefined,
    };
    const { resultMsg } = await save(param);
    message.success(resultMsg);
    closeAndSwitchRefresh(pageTitle, fromTitle);
  }

  closeEdit() {
    const { $util: { closeAndSwitch }, pageTitle, fromMenu: {
      fromTitle,
    }} = this.props;
    closeAndSwitch(pageTitle, fromTitle);
  }

  addSkuItem(selectedRowKeys, selectedRows) {
    const { selectGoodsList } = this.state;
    const goodsList = [...selectGoodsList];
    selectedRows.forEach(item => {
      if (goodsList.reduce((status, data) => status && data.id !== item.id, true)) {
        goodsList.unshift(item);
      }
    });
    this.setState({
      selectGoodsList: goodsList,
    });
  }

  revertOneGoods(id) {
    const { selectGoodsList } = this.state;
    this.setState({
      selectGoodsList: selectGoodsList.filter(item => item.id.toString() !== id.toString()),
    });
  }

  renderGoodsSelect() {
    const { selectGoodsList } = this.state;
    return (
      <Fragment>
        <Button style={{ marginBottom: '10px' }} onClick={() => this.modal.onShow(true)}>选择商品</Button>
        <Table
          columnsRender={{
            action: (val, record) => <a onClick={() => this.revertOneGoods(record.id)}>撤销促销</a>,
          }}
          dataSource={selectGoodsList}
        />
      </Fragment>
    );
  }

  render() {
    const { details } = this.state;
    if (!details) return null;
    return (
      <Page
        fieldsStore={details}
        getForm={saveRef(this, 'form')}
        rootContext={{
          ...this.props,
          renderGoodsSelect: (...arg) => this.renderGoodsSelect(...arg),
        }}
        onSubmit={(...arg) => this.onSubmit(...arg)}
        layout="inline"
        labelStyle={{ width: '85px' }}
      >
        <SkuSelectModal
          skuApi="/global/search/w/api/sku/1/assembleQuery"
          getModal={saveRef(this, 'modal')}
          onOk={(...arg) => this.addSkuItem(...arg)}
        />
        <div style={{ width: '100%', paddingTop: '30px', textAlign: 'center' }}>
          <Button type="primary" onClick={() => this.form.onSubmit()}>
            提交
          </Button>
          <Button style={{ marginLeft: '8px' }} onClick={() => this.closeEdit()}>
            取消
          </Button>
        </div>
      </Page>
    );
  }
}

export default CouponEdit;
