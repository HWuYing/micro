import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, Divider, message } from 'antd';
import { reducer } from '@applyStore';
import { SearchForm, particulate, Authorized } from '@components';
import { createStandard } from '@model';
import { BasicPage } from '@pageModel';
import { PAGE_EDIT_TYPE } from '@common/config';
import { reducers, action } from '../../store';
import { searchConfig, tableConfig } from '../config';

const { createPaginationToolsTable } = particulate;
const Page = BasicPage(createStandard(SearchForm(searchConfig), createPaginationToolsTable(tableConfig, false)));

@connect(({ marketingDirector: { marketingDirectorList } }) => ({ marketingDirectorList }), {
  getList: action.getMarketingDirectorList,
})
@reducer('marketingDirector', reducers)
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

  onEdit(e, record, pageTitle="新增营销总监", path) {
    const { id } = record;
    this.onOpen(e, pageTitle, `/marketing-director-manage/${path}/${id}`);
  }

  onRelationService(e, record, pageTitle="关联服务商") {
    const { id } = record;
    this.onOpen(e, pageTitle, `/marketing-director-manage/relation-service-provider/${id}`);
  }

  async fetchList(fields) {
    const { getList } = this.props;
    await getList(fields);
  }

  renderAction(value, record) {
    return (
      <Authorized>
        <a onClick={(e) => this.onEdit(e, record, `编辑营销总监`, PAGE_EDIT_TYPE.EDIT.prefix)}>编辑</a>
        <Divider type="vertical" />
        <a onClick={(e) => this.onRelationService(e, record, `关联服务商`)}>关联查看</a>
      </Authorized>
    );
  }

  renderTools() {
    return (
      <Authorized>
        <Button onClick={(e) => this.onEdit(e, { id: '0' }, '新增营销总监', 'add')} type="primary">新增营销总监</Button>
      </Authorized>
    );
  }

  render() {
    const { marketingDirectorList: { list, total } } = this.props;
    return (
      <Page
        columnsRender={{
          action: (...arg) => this.renderAction(...arg),
        }}
        renderTools={this.renderToolsBind}
        dataSource={list}
        total={total}
        fetchList={this.fetchListBind}
      />
    )
  }
}

export default MarketingDirectorList;
