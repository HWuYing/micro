import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, Divider, message } from 'antd';
import { reducer } from '@applyStore';
import { SearchForm, particulate, Authorized } from '@components';
import { createStandard } from '@model';
import { createFormModal } from '@modalModel';
import { BasicPage } from '@pageModel';
import { PAGE_EDIT_TYPE } from '@common/config';
import { component } from '@particulate';
import { download } from '@util';
import { hasOwnProperty } from '@tools';
import { ACTIVITY_STATUS, U_BEAN_QR_STATUS } from '../../enum';
import { reducers, action } from '../../store';
import { editConfig, searchConfig, tableConfig } from '../config';

const { saveRef } = component;
const { createPaginationToolsTable, createForm } = particulate;
const Page = BasicPage(createStandard(() => null, createPaginationToolsTable(tableConfig, false)));


@connect(({ activityUBeanManage: { scanCodePresentationList } }) => ({ scanCodePresentationList }), {
  getList: action.getUBeanScanCodePresentationQueryList,
  save: action.saveUBeanScanCodePresentation,
  batchDelete: action.deleteUBeanScanCodePresentation,
  getCompanyList: action.getCompanyList,
  tarFileScanCodePresentation: action.tarFileScanCodePresentation,
})
@reducer('activityUBeanManage', reducers)
class MarketingDirectorList extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.EditModal = createFormModal(createForm(editConfig, undefined, {
      onValuesChange: this.onValuesChange.bind(this),
    }), {
      width: 700,
      title: '赠送事例',
      destroyOnClose: true,
    });
    this.fetchListBind = this.fetchList.bind(this);
    this.renderToolsBind = this.renderTools.bind(this);
    this.queryCompanyEntryBind = this.queryCompanyEntry.bind(this);
    this.onSubmitBind = this.onSubmit.bind(this);
    this.state = {
      currentRecord: {},
      currentCompanyList: [],
    };
    this.currentField = {};
  }

  onShowEdit(record) {
    this.setState({
      currentRecord: { ...record },
    }, () => this.editModal.onShow(true));
  }

  onAdd() {
    this.onShowEdit({});
  }

  onEdit(e, record) {
    this.stopPropagation(e);
    const { companyId, companyName, startTime, endTime } = record;
    this.onShowEdit({
      ...record,
      time: {
        start: startTime,
        end: endTime,
      },
      company: {
        id: companyId,
        name: companyName,
      },
    });
  }

  async onDelete(e, record) {
    const { batchDelete } = this.props;
    this.stopPropagation(e);
    const { resultMsg } = await batchDelete({
      idList: [record.id],
    });
    message.success(resultMsg);
    await this.fetchList(this.currentField);
  }

  async onSubmit(fields) {
    const { save } = this.props;
    const { currentRecord } = this.state;
    const { company, time } = fields;
    const params = {
      ...currentRecord,
      ...fields,
      companyId: company.key || company.value,
      companyName: company.label,
      startTime: time.start,
      endTime: time.end,
      company: undefined,
      time: undefined,
    };
    const { resultMsg } = await save(params);
    message.success(resultMsg);
    await this.fetchList(this.currentField);
  }

  async onBatchFactoryQr(e, record) {
    const { zipStatus } = record;
    if (zipStatus && zipStatus.toString() === U_BEAN_QR_STATUS.ING.value.toString()) {
      return message.warning('二维码生成中，请稍后...');
    }
    this.stopPropagation(e);
    const { tarFileScanCodePresentation } = this.props;
    const { id } = record;
    const { resultMsg } = await tarFileScanCodePresentation({ id });
    message.success(resultMsg);
    await this.fetchList(this.currentField);
  }

  onValuesChange(props, changedValues) {
    if (hasOwnProperty(changedValues, 'companyType')) {
      this.setState({
        currentCompanyList: [],
      });
      this.editForm.setFormFieldsValue({
        company: undefined,
      });
    }
  }

  onCompanyFetch = () => {
    let si = null;
    function clientSi() {
      if (!si) return;
      clearTimeout(si);
      si = null;
    }
    return async (val) => {
      const { getCompanyList } = this.props;
      const { companyType } = this.editForm.getFieldsValue();
      clientSi();
      si = setTimeout(async () => {
        si = null;
        const { data } = await getCompanyList({
          name: val,
          type: companyType,
          pageNum: 1,
          pageSize: 10,
        });
        this.setState({
          currentCompanyList: data,
        });
      }, 200);
    };
  };

  stopPropagation(e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  async fetchList(fields) {
    const { getList } = this.props;
    this.currentField = fields;
    await getList(fields);
  }

  queryCompanyEntry(props, decoratorNode, fileEle, form) {
    const { currentCompanyList } = this.state;
    return decoratorNode(fileEle({
      form,
      children: currentCompanyList,
      onSearch: this.onCompanyFetch(),
      onFocus: () => {
        const { company: { label } = {} } = form.getFieldsValue();
        this.onCompanyFetch()(label);
      },
    }));
  }

  renderAction(value, record) {
    const { status } = record;
    return (
      <Authorized author={{ status }}>
        <span
          author={{
            status: [
              ACTIVITY_STATUS.STARTING.value,
              ACTIVITY_STATUS.INIT.value,
            ],
          }}
        >
          <a onClick={(e) => this.onEdit(e, record)}>编辑</a>
          <Divider type="vertical" />
        </span>
        <span
          author={{
            status: [
              ACTIVITY_STATUS.END.value,
              ACTIVITY_STATUS.INIT.value,
            ],
          }}
        >
          <a onClick={(e) => this.onDelete(e, record)}>删除</a>
          <Divider type="vertical" />
        </span>
        <a onClick={(e) => this.onBatchFactoryQr(e, record)}>生成二维码</a>
        <Divider type="vertical" />
        <a onClick={(e) => {
          if (!record.zipUrl) return message.warning('二维码还未生成');
          return download(record.zipUrl, '二维码.zip')
        }}>下载</a>
      </Authorized>
    );
  }

  renderTools() {
    return (
      <Authorized>
        <Button onClick={() => this.onAdd()} type="primary">添加赠送事例</Button>
      </Authorized>
    );
  }

  render() {
    const { scanCodePresentationList: { list, total } } = this.props;
    const { currentRecord } = this.state;
    const { EditModal } = this;
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
          rootContext={{
            queryCompanyEntry: this.queryCompanyEntryBind,
            currentRecord,
          }}
          fieldsStore={currentRecord}
          labelStyle={{ width: '130px' }}
          onOk={this.onSubmitBind}
          getForm={saveRef(this, 'editForm')}
          getModal={saveRef(this, 'editModal')}
        />
      </Page>
    );
  }
}

export default MarketingDirectorList;
