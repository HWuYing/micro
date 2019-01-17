import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Divider, message } from 'antd';
import { reducer } from '@applyStore';
import { SearchForm, particulate, Authorized } from '@components';
import { createStandard } from '@model';
import { createFormModal } from '@modalModel';
import { BasicPage } from '@pageModel';
import { PAGE_EDIT_TYPE } from '@common/config';
import { component } from '@particulate';
import { reducers, action } from '../../store';
import { editConfig, searchConfig, tableConfig } from '../config';

const { saveRef } = component;
const { createPaginationToolsTable, createForm } = particulate;
const Page = BasicPage(createStandard(() => null, createPaginationToolsTable(tableConfig, false)));
const EditModal = createFormModal(createForm(editConfig), {
  width: 700,
  title: '添加批量扫码赠送事例',
});

@connect(({ uBeanManage: { scanCodePresentationList } }) => ({ scanCodePresentationList }), {
  getList: action.getUBeanScanCodePresentationQueryList(),
})
@reducer('uBeanManage', reducers)
class MarketingDirectorList extends PureComponent{
  constructor(props, context) {
    super(props, context);
    this.fetchListBind = this.fetchList.bind(this);
    this.renderToolsBind = this.renderTools.bind(this);
  }

  onOpen(e, pageTitle, path) {
    const { $util: { closeAndOpen } } = this.props;
    if(e) {
      e.preventDefault();
      e.stopPropagation();
    }
    closeAndOpen(pageTitle, {
      name: pageTitle,
      path,
    });
  }

  onEdit(e, record, title="新增营销总监", path) {
    const { id } = record;
    this.onOpen(e, title, `/marketing-director-manage/${path}/${id}`);
  }

  onRelationService(e, record, title="关联服务商") {
    const { id } = record;
    this.onOpen(e, title, `/marketing-director-manage/relation-service-provider/${id}`);
  }

  async fetchList(fields) {
    const { getList } = this.props;
    await getList(fields);
  }

  renderAction(value, record) {
    return (
      <Authorized>
        <a onClick={(e) => this.onEdit(e, record, `编辑`, PAGE_EDIT_TYPE.EDIT.prefix)}>编辑</a>
        <Divider type="vertical" />
        <a onClick={(e) => this.onRelationService(e, record, `关联服务商`)}>删除</a>
        <Divider type="vertical" />
        <a onClick={(e) => this.onRelationService(e, record, `关联服务商`)}>批量生产二维码</a>
        <Divider type="vertical" />
        <a onClick={(e) => this.onRelationService(e, record, `关联服务商`)}>下载</a>
      </Authorized>
    );
  }

  renderTools() {
    return (
      <Authorized>
        <Button onClick={() => this.editModal.onShow(true)} type="primary">添加批量扫码赠送事例</Button>
      </Authorized>
    );
  }

  render() {
    const { scanCodePresentationList: { list, total } } = this.props;
    return (
      <Page
        columnsRender={{
          action: (...arg) => this.renderAction(...arg),
        }}
        renderTools={this.renderToolsBind}
        dataSource={list}
        total={total}
        fetchList={this.fetchListBind}
      >
        <EditModal
          layout="inline"
          labelStyle={{ width: '120px' }}
          getForm={saveRef(this, 'editForm')}
          getModal={saveRef(this, 'editModal')}
        />
      </Page>
    )
  }
}

export default MarketingDirectorList;
