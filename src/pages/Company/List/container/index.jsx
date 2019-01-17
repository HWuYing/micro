import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Divider, message } from 'antd';
import { reducer } from '@applyStore';
import { SearchForm, particulate, Authorized } from '@components';
import { createStandardTabs } from '@model';
import { BasicPage } from '@pageModel';
import { PROJECT_CONFIG } from '@common/config';
import { COMPANY_STATUS } from '../../enum';
import { formConfig, tableConfig } from '../config';
import { action, reducers } from '../../store';

const { createPaginationTable } = particulate;
const Page = BasicPage(createStandardTabs(SearchForm(formConfig), createPaginationTable(tableConfig)));

@connect(({ companyManage: { decorMap, providerMap }}) => ({
  providerMap,
  decorMap,
}), {
  getProviderList: action.getProviderList,
  getDecorList: action.getDecorList,
  openDistribute: action.openDistribute,
  closeDistribute: action.closeDistribute,
})
@reducer('companyManage', reducers)
class List extends Component {
  constructor(props, context) {
    super(props, context);
    this.currentPlan = 'THROUGH_AUDIT';
  }

  shouldComponentUpdate(nextProps) {
    const { props } = this;
    const { companyType, providerMap, decorMap } = nextProps;
    return (companyType === PROJECT_CONFIG.ENTERPRISE.value && decorMap !== props.decorMap) ||
      (companyType === PROJECT_CONFIG.SERVICE.value && providerMap !== props.providerMap);
  }

  onToPage = (e, pageTitle, path, $util) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const { closeAndOpen } = $util;
    closeAndOpen(pageTitle, {
      name: pageTitle,
      path,
    });
  };

  onEdit(e, record, pageTitle = '下级渠道资料', companyType, editType) {
    const { id } = record;
    const { $util } = this.props;
    const { getHost, setHost } = $util;
    const host = getHost();
    setHost(undefined);
    this.onToPage(e, pageTitle, `/${companyType}-manage/${editType}/${id}`, $util);
    setHost(host);
  }

  onSalesList(e, record, pageTitle="销售数据", companyType) {
    const { id } = record;
    const { $util } = this.props;
    this.onToPage(e, pageTitle, `/${companyType}-manage/sales-order/list/${id}`, $util);
  }

  onDistributorList(e, record, pageTitle="创客数据", companyType) {
    const { id } = record;
    const { $util } = this.props;
    this.onToPage(e, pageTitle, `/${companyType}-manage/distributor/list/${id}`, $util);
  }

  async onDelete(idList) {
    const { deleteStore, $util: { refreshPage }, pageTitle } = this.props;
    const { resultMsg } = await deleteStore({
      idList,
    });
    message.success(resultMsg);
    refreshPage(pageTitle);
  }

  onSelectionChange(selectedRowKeys, selectedRows) {
    this.selectedRows = selectedRows;
  }

  getStoreObj() {
    const {
      companyType,
      getProviderList,
      getDecorList,
      providerMap,
      decorMap,
    } = this.props;
    let getList;
    let sourceMap;
    switch (companyType) {
      case PROJECT_CONFIG.ENTERPRISE.value: getList = getDecorList;sourceMap = decorMap; break;
      case PROJECT_CONFIG.SERVICE.value: getList = getProviderList;sourceMap = providerMap; break;
      default: break;
    }
    return {
      sourceMap,
      getList,
    }
  }

  async toggleDistribute(fn) {
    if (this.selectedRows.length === 0) return message.warn('请至少选择一条数据');
    const { $util: { refreshPage }, pageTitle } = this.props;
    const { resultMsg } = await fn(this.selectedRows.map(item => item.id));
    message.success(resultMsg);
    refreshPage(pageTitle);
  }

  async closeDistribute(idList) {
    const { closeDistribute } = this.props;
    return closeDistribute({
      idList,
    });
  }

  async openDistribute(idList) {
    const { openDistribute } = this.props;
    return openDistribute({
      idList,
    });
  }

  fetchList(fields) {
    const { getList } = this.getStoreObj();
    const { enumKey } = fields;
    getList({
      statusFlag: COMPANY_STATUS[enumKey].value,
      ...fields,
    });
  }

  renderTools() {
    return (
      <Authorized target="div" style={{marginBottom: '10px'}}>
        <Button style={{ marginRight: "10px" }} type="primary" onClick={() => this.toggleDistribute(async (...arg) => this.openDistribute(...arg))}>批量启用</Button>
        <Button type="primary" onClick={() => this.toggleDistribute(async (...arg) => this.closeDistribute(...arg))}>批量禁用</Button>
      </Authorized>
    );
  }

  renderAction(value, record) {
    const { companyType:orgType } = this.props;
    const { statusFlag } = record;
    const isEnterprise = orgType === PROJECT_CONFIG.ENTERPRISE.value;
    const companyType = isEnterprise ? 'enterprise' : 'service-provider';
    const pateTitle = isEnterprise ? '渠道客户' : '服务商客户';
    const isNotWaitAuditAuthor = { statusFlag: COMPANY_STATUS.THROUGH_AUDIT.value };
    const isWaitAuditAuthor = { statusFlag: COMPANY_STATUS.WAIT_AUDIT.value };
    return (
      <Authorized author={{ statusFlag: statusFlag.toString() }}>
        <span>
          <a onClick={(e) => this.onEdit(e, record, `查看${pateTitle}`, companyType, 'see')}>查看</a>
        </span>
        <span author={isNotWaitAuditAuthor}>
          <Divider type="vertical" />
          <a onClick={(e) => this.onSalesList(e, record, `销售数据`, companyType)}>销售数据</a>
        </span>
        <span author={isNotWaitAuditAuthor}>
          <Divider type="vertical" />
          <a onClick={(e) => this.onDistributorList(e, record, `创客查看`, companyType)}>创客查看</a>
        </span>
        <span author={isWaitAuditAuthor}>
          <Divider type="vertical" />
          <a onClick={(e) => this.onEdit(e, record, `${pateTitle}审核`, companyType, 'audit')}>审核</a>
        </span>
      </Authorized>
    );
  }

  render() {
    const { companyType } = this.props;
    const { sourceMap } = this.getStoreObj();
    return (
      <Fragment>
        <Page
          renderPageTools={this.renderTools()}
          columnsRender={{
            action: (...arg) => this.renderAction(...arg),
          }}
          formContext={{ companyType }}
          ENUM_STATUS={{...COMPANY_STATUS}}
          author={{ companyType }}
          storeState={sourceMap}
          defaultActiveKey={this.currentPlan}
          onSelectionChange={(...arg) => this.onSelectionChange(...arg)}
          fetchList={(...arg) => this.fetchList(...arg)}
        />
      </Fragment>

    );
  }
}

export default List;
