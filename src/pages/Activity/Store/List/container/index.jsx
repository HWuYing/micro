import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Divider, message } from 'antd';
import { reducer } from '@applyStore';
import { particulate, Authorized } from '@components';
import { createStandard } from '@model';
import { BasicPage } from '@pageModel';
import { PAGE_EDIT_TYPE } from '@common/config';
import { ACTIVITY_STATUS } from '../../enum';
import { reducers, action } from '../../store'
import { tableConfig } from '../config';

const { createPaginationToolsTable  } = particulate;
const Table = createPaginationToolsTable(tableConfig, false);
const Page = BasicPage(createStandard(undefined, Table));

@connect(({ activityStoreManage: { storeList } }) => ({
  storeList,
}), {
  getList: action.getList,
  batchChangeState: action.batchChangeState,
  batchDelete: action.batchDelete,
})
@reducer('activityStoreManage', reducers)
class List extends Component {
  onEdit(e, record, type, pageTitle = '新增门店活动') {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const { $util: { closeAndOpen } } = this.props;
    const { id } = record;
    closeAndOpen(pageTitle, {
      name: pageTitle,
      path: `/store-activities/edit/${id}?type=${type}`,
    });
  }

  async onDelete(idList) {
    const { batchDelete, $util: { refreshPage }, pageTitle } = this.props;
    const { resultMsg } = await batchDelete({
      idList,
    });
    message.success(resultMsg);
    refreshPage(pageTitle);
  }

  async batchChangeState(idList, state) {
    const { batchChangeState, $util: { refreshPage }, pageTitle } = this.props;
    const { resultMsg } = await batchChangeState({
      idList,
      state,
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
        <Button icon="plus" type="primary" onClick={() => this.onEdit(undefined, { id: 0 }, PAGE_EDIT_TYPE.ADD.value, '新增门店活动')}>新增门店活动</Button>
      </Authorized>
    );
  }

  renderAction(value, record) {
    const { statusFlag } = record;
    const author = { statusFlag: statusFlag ? statusFlag.toString() : '2' };
    return (
      <Authorized author={author}>
        <span author={{ statusFlag: ACTIVITY_STATUS.CLOSE.value }}>
          <a onClick={() => this.batchChangeState([record.id], ACTIVITY_STATUS.OPEN.value)}>开启</a>
          <Divider type="vertical" />
          <a onClick={(e) => this.onEdit(e, record, PAGE_EDIT_TYPE.EDIT.value, '修改门店活动配置')}>修改配置</a>
          <Divider type="vertical" />
          <a onClick={() => this.onDelete([record.id])}>删除</a>
        </span>
        <span author={{ statusFlag: ACTIVITY_STATUS.OPEN.value }}>
          <a onClick={() => this.batchChangeState([record.id], ACTIVITY_STATUS.CLOSE.value)}>关闭</a>
        </span>
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
          fetchList={(...arg) => this.fetchList(...arg)}
          dataSource={list}
          total={total}
        />
      </Fragment>

    );
  }
}

export default List;
