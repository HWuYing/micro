import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Divider, message, Popconfirm } from 'antd';
import { reducer } from '@applyStore';
import { SearchForm, particulate, Authorized } from '@components';
import { createStandard } from '@model';
import { BasicPage } from '@pageModel';
import { PAGE_EDIT_TYPE } from '@common/config';
import { reducers, action } from '../../store'
import { tableConfig, formConfig } from '../config';

const { createPaginationToolsTable  } = particulate;
const Form = SearchForm(formConfig);
const Table = createPaginationToolsTable(tableConfig, false);
const Page = BasicPage(createStandard(Form, Table));

@connect(({ activityCouponManage: { couponList } }) => ({
  couponList,
}), {
  getList: action.getList,
  deleteActivity: action.deleteActivity,
})
@reducer('activityCouponManage', reducers)
class List extends Component {

  onEdit(e, record, type, pageTitle = '优惠卷详情') {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const { $util: { closeAndOpen } } = this.props;
    const { id } = record;
    closeAndOpen(pageTitle, {
      name: pageTitle,
      path: `/activity/coupon/edit/${id}?type=${type}`,
    });
  }

  async onDelete(idList) {
    const { deleteActivity, $util: { refreshPage }, pageTitle } = this.props;
    const { resultMsg } = await deleteActivity({
      idList,
    });
    message.success(resultMsg);
    refreshPage(pageTitle);
  }

  fetchList(fields) {
    const { getList } = this.props;
    getList(fields);
  }

  renderTools() {
    return (
      <Authorized>
        <Button icon="plus" type="primary" onClick={() => this.onEdit(undefined, { id: 0 }, PAGE_EDIT_TYPE.ADD.value, '新增优惠券')}>新增优惠券</Button>
      </Authorized>
    );
  }

  renderAction(value, record) {
    return (
      <Authorized>
        <a onClick={(e) => this.onEdit(e, record, PAGE_EDIT_TYPE.EDIT)}>编辑</a>
        <Divider type="vertical" />
        <Popconfirm
          placement="topLeft"
          title="删除该条数据？"
          okText="Yes"
          cancelText="No"
          key="batch-delete"
          onConfirm={() => this.onDelete([record.id])}
        >
          <a>删除</a>
        </Popconfirm>
      </Authorized>
    );
  }

  render() {
    const { couponList: { list, total } } = this.props;
    return (
      <Page
        renderTools={this.renderTools()}
        columnsRender={{
          action: (...arg) => this.renderAction(...arg),
        }}
        fetchList={(...arg) => this.fetchList(...arg)}
        dataSource={list}
        total={total}
      />
    );
  }
}

export default List;
