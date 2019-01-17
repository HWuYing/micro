import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Button, Divider, message } from 'antd';
import { reducer } from '@applyStore';
import { SearchForm, particulate, Authorized } from '@components';
import { createStandard } from '@model';
import { BasicPage } from '@pageModel';
import { PROJECT_CONFIG } from '@common/config';
import { DISTRIBUTOR_STATUS } from '../../enum';
import { formConfig, tableConfig } from '../config';
import { action, reducers } from '../../store';

const { createStandardToolsTable, createPaginationToolsTable } = particulate;


@connect(() => ({}), {
  getList: action.getList,
  openDistribute: action.openDistribute,
  closeDistribute: action.closeDistribute,
})
@reducer('distributorManage', reducers)
class List extends Component {
  static contextTypes = {
    author: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    const { audit } = props;
    const { author: { system } } = context;
    const isStandardTable = PROJECT_CONFIG.ERP.platform === system && !audit;
    const Table = (isStandardTable ? createStandardToolsTable : createPaginationToolsTable)(tableConfig);
    const Form = SearchForm(formConfig);
    this.Page = BasicPage(createStandard(Form, Table));
    this.state = {
      source: {
        list: [],
        total: 0,
      },
    };
  }

  onEdit(e, record, pageTitle = '创客资料', editType) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const { $util: { closeAndOpen } } = this.props;
    const { id } = record;
    closeAndOpen(pageTitle, {
      name: pageTitle,
      path: `/distributor-manage/${editType}/${id}`,
    });
  }

  onSelectionChange(selectedRowKeys, selectedRows) {
    this.selectedRows = selectedRows;
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

  async fetchList(fields) {
    const { auditStatus, getList } = this.props;
    const { data, total } = await getList({
      auditStatus: (auditStatus || []).join(','),
      ...fields,
    });
    this.setState({
      source: {
        list: data,
        total,
      },
    })
  }

  renderTools() {
    const { audit } = this.props;
    const author = {
      system: PROJECT_CONFIG.ERP.platform,
      audit: false,
    };
    return (
      <Authorized author={{ audit }}>
        <Button
          author={author}
          type="primary"
          onClick={() => this.toggleDistribute(async (...arg) => this.openDistribute(...arg))}
        >
          批量启用
        </Button>
        <Button
          author={author}
          type="primary"
          onClick={() => this.toggleDistribute(async (...arg) => this.closeDistribute(...arg))}
        >
          批量禁用
        </Button>
      </Authorized>
    );
  }

  renderAction(value, record) {
    const { audit } = this.props;
    const { auditStatus } = record;
    return (
      <Authorized author={{ auditStatus: auditStatus.toString(), audit }}>
        <a onClick={(e) => this.onEdit(e, record, '创客资料编辑', 'info')}>查看</a>
        <span author={{ auditStatus: DISTRIBUTOR_STATUS.THROUGH_AUDIT.value }}>
          <Divider type="vertical" />
          <a onClick={e => this.onEdit(e, record, '关联用户', 'subordinate-list')}>关联用户</a>
          <Divider type="vertical" />
          <a onClick={e => this.onEdit(e, record, '佣金明细', 'order-list')}>佣金明细</a>
        </span>
        <span
          author={{
            system: PROJECT_CONFIG.ERP.platform,
            auditStatus: DISTRIBUTOR_STATUS.WAIT_AUDIT.value,
          }}
        >
          <Divider type="vertical" />
          <a onClick={(e) => this.onEdit(e, record, '创客资料审核', 'audit')}>审核</a>
        </span>
      </Authorized>
    );
  }

  render() {
    const { Page } = this;
    const { source: { list, total } } = this.state;
    const { audit } = this.props;
    return (
      <Fragment>
        <Page
          author={{ audit }}
          columnsRender={{
            action: (...arg) => this.renderAction(...arg),
          }}
          renderTools={() => this.renderTools()}
          dataSource={list}
          total={total}
          onSelectionChange={(...arg) => this.onSelectionChange(...arg)}
          fetchList={(...arg) => this.fetchList(...arg)}
        />
      </Fragment>
    );
  }
}

export default List;
