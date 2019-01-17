import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Divider, message } from 'antd';
import { reducer } from '@applyStore';
import { SearchForm, particulate, Authorized } from '@components';
import { createStandard } from '@model';
import { BasicPage } from '@pageModel';
import { PAGE_EDIT_TYPE } from '@common/config';
import { reducers, action } from '../../store'
import { formConfig, tableConfig } from '../config';

const { createStandardToolsTable  } = particulate;
const Form = SearchForm(formConfig);
const Table = createStandardToolsTable(tableConfig);
const Page = BasicPage(createStandard(Form, Table));

@connect(({ storeManage: { storeList } }) => ({
  storeList,
}), {
  getList: action.getList,
  getDetail: action.getDetail,
  deleteStore: action.deleteStore,
  closeDistribute: action.closeDistribute,
  openDistribute: action.openDistribute,
})
@reducer('storeManage', reducers)
class List extends Component {
  constructor(props, context) {
    super(props, context);
    this.selectedRows = [];
  }

  onEdit(e, record, type, pageTitle = '门店资料') {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const { $util: { closeAndOpen } } = this.props;
    const { id } = record;
    closeAndOpen(pageTitle, {
      name: pageTitle,
      path: `/store-manage/edit/${id}?type=${type}`,
    });
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

  onOpenLower(e, record, pageTitle='门店下级渠道') {
    if(e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const { $util: { closeAndOpen } } = this.props;
    closeAndOpen(pageTitle, {
      name: pageTitle,
      path: `/store-manage/lowerchannel/${record.id}`,
    })
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
    const { getList } = this.props;
    getList(fields);
  }

  renderTools() {
    return (
      <Authorized>
        <Button icon="plus" type="primary" onClick={() => this.onEdit(undefined, { id: 0 }, PAGE_EDIT_TYPE.ADD.value, '添加门店')}>添加门店</Button>
        <Button type="primary" onClick={() => this.toggleDistribute(async (...arg) => this.openDistribute(...arg))}>批量启用</Button>
        <Button type="primary" onClick={() => this.toggleDistribute(async (...arg) => this.closeDistribute(...arg))}>批量禁用</Button>
      </Authorized>
    );
  }

  renderAction(value, record) {
    return (
      <Authorized>
        <a onClick={(e) => this.onEdit(e, record, PAGE_EDIT_TYPE.SEE.value)}>查看</a>
        <Divider type="vertical" />
        <a onClick={(e) => this.onEdit(e, record,  PAGE_EDIT_TYPE.EDIT.value)}>编辑</a>
        <Divider type="vertical" />
        <a onClick={() => this.onDelete([record.id])}>删除</a>
        <Divider type="vertical" />
        <a onClick={(e) => this.onOpenLower(e, record)}>下级查看</a>
      </Authorized>
    );
  }

  render() {
    const { storeList: { list, total } } = this.props;
    return (
      <Fragment>
        <Page
          renderTools={this.renderTools()}
          columnsRender={{
            action: (...arg) => this.renderAction(...arg),
          }}
          onSelectionChange={(...arg) => this.onSelectionChange(...arg)}
          fetchList={(...arg) => this.fetchList(...arg)}
          dataSource={list}
          total={total}
        />
      </Fragment>

    );
  }
}

export default List;
