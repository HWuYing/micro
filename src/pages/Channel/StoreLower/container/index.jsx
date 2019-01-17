import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Divider, message } from 'antd';
import { reducer } from '@applyStore';
import { SearchForm, particulate, Authorized } from '@components';
import { createStandardTabs } from '@model';
import { BasicPage } from '@pageModel';
import { PROJECT_CONFIG } from '@common/config';
import { reducers, action } from '../../store';
import { COMPANY_STATUS } from '../enum';
import { COMPANY_TYPE } from '../../../Company/enum';
import { formConfig, tableConfig } from '../config';

const { createPaginationTable } = particulate;
const Form = SearchForm(formConfig);
const Table = createPaginationTable(tableConfig, false);
const Page = BasicPage(
  createStandardTabs(Form, Table, {
    ENUM_STATUS: {
      ...COMPANY_STATUS,
    },
  })
);

@connect(
  () => ({}),
  {
    getList: action.getStoreLowerList,
  }
)
@reducer('channelManage', reducers)
class List extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      storeLoweMap: {},
    };
    this.selectedRows = [];
    this.currentPlan = 'THROUGH_AUDIT';
  }

  onEdit(e, record, pageTitle = '下级渠道资料', companyType, editType) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const {
      $util: { closeAndOpen },
    } = this.props;
    const { id } = record;
    closeAndOpen(pageTitle, {
      name: pageTitle,
      path: `/${companyType}-manage/${editType}/${id}`,
    });
  }

  async onDelete(idList) {
    const {
      deleteStore,
      $util: { refreshPage },
      pageTitle,
    } = this.props;
    const { resultMsg } = await deleteStore({
      idList,
    });
    message.success(resultMsg);
    refreshPage(pageTitle);
  }

  onSelectionChange(selectedRowKeys, selectedRows) {
    this.selectedRows = selectedRows;
  }

  onOpenLower(e, record, pageTitle = '门店下级渠道') {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const {
      $util: { closeAndOpen },
    } = this.props;
    closeAndOpen(pageTitle, {
      name: pageTitle,
      path: `/store-manage/lowerchannel/${record.id}`,
    });
  }

  onCharge(e, record) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const {
      $util: { closeAndOpen },
    } = this.props;
    closeAndOpen('立即转充', {
      name: '立即转充',
      path: `/payment/ucurrency-recharge/${record.id}`,
    });
  }

  async toggleDistribute(fn) {
    if (this.selectedRows.length === 0) return message.warn('请至少选择一条数据');
    const {
      $util: { refreshPage },
      pageTitle,
    } = this.props;
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

  async fetchList(fields) {
    const { enumKey } = fields;
    const { storeLoweMap } = this.state;
    const { getList, companyType } = this.props;
    const { data, total } = await getList({
      statusFlag: COMPANY_STATUS[enumKey].value,
      orgType: companyType,
      ...fields,
    });
    this.setState({
      storeLoweMap: {
        ...storeLoweMap,
        [enumKey]: {
          list: data,
          total,
        },
      },
    });
  }

  renderTools() {
    const { companyType } = this.props;
    return (
      <Authorized author={{ companyType }} target="div" style={{ marginBottom: '10px' }}>
        <Button
          author={{ companyType: COMPANY_TYPE.ENTERPRISE.value }}
          style={{ marginRight: '10px' }}
          icon="plus"
          type="primary"
          onClick={() => this.onEdit(undefined, { id: 0 }, '添加渠道客户', 'enterprise', 'add')}
        >
          添加渠道客户
        </Button>
        <Button
          author={{ companyType: COMPANY_TYPE.SERVICE_PROVIDER.value }}
          icon="plus"
          type="primary"
          onClick={() => this.onEdit(undefined, { id: 0 }, '添加服务商', 'service-provider', 'add')}
        >
          添加服务商
        </Button>
      </Authorized>
    );
  }

  renderAction(value, record) {
    const { orgType, statusFlag } = record;
    const isEnterprise = orgType && orgType.toString() === COMPANY_TYPE.ENTERPRISE.value;
    const companyType = isEnterprise ? 'enterprise' : 'service-provider';
    const pateTitle = isEnterprise ? '渠道客户' : '服务商客户';
    return (
      <Authorized author={{ statusFlag: statusFlag && statusFlag.toString() }}>
        <a onClick={e => this.onEdit(e, record, `查看${pateTitle}`, companyType, 'see')}>查看</a>
        <Divider type="vertical" />
        <a onClick={e => this.onEdit(e, record, `编辑${pateTitle}`, companyType, 'edit')}>编辑</a>
        <span
          author={{
            statusFlag: COMPANY_STATUS.THROUGH_AUDIT.value,
            system: PROJECT_CONFIG.STORE.platform,
          }}
        >
          <Divider type="vertical" />
          {isEnterprise ? <a onClick={e => this.onCharge(e, record)}>充值</a> : null}
        </span>
      </Authorized>
    );
  }

  render() {
    const { storeLoweMap } = this.state;
    console.log(storeLoweMap);
    return (
      <Fragment>
        <Page
          renderPageTools={this.renderTools()}
          columnsRender={{
            action: (...arg) => this.renderAction(...arg),
          }}
          storeState={storeLoweMap}
          defaultActiveKey={this.currentPlan}
          onSelectionChange={(...arg) => this.onSelectionChange(...arg)}
          fetchList={(...arg) => this.fetchList(...arg)}
        />
      </Fragment>
    );
  }
}

export default List;
