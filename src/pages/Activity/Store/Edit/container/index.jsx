import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Button, Form as AntdForm, Icon, message } from 'antd';
import { reducer } from '@applyStore';
import { particulate } from '@components';
import { component } from '@particulate';
import DataEntry from '@components/particulate/Entry';
import { BasicPage } from '@pageModel';
import * as rexRules from '@tools';
import GoodsSearchModel from '../../../../../components/Entry/GoodsSearchModel';
import { reducers, action } from '../../store';
import formConfig from '../config/base.form';
import styles from './index.less';

const { createForm } = particulate;
const { saveRef } = component;
const FormItem = AntdForm.Item;
const Page = BasicPage(createForm(formConfig), {
  style: {
    maxWidth: '900px',
  },
});

@connect(() => ({}), {
  getDetails: action.getDetails,
  update: action.update,
  save: action.save,
})
@reducer('activityStoreManage', reducers)
class StoreActivitiesEdit extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.hashFieldKey = (() => {
      let count = 1;
      return () => {
        count += 1;
        return `goods${count}`;
      };
    })();
    this.onSubmitStatus = false;
    this.state = {
      renderStatus: false,
      dataSource: {},
    };
    this.goodsMap = [this.factoryModelTemplate(0)];
  }

  componentDidMount() {
    const { getDetails, match: { params } } = this.props;
    getDetails(params).then(({ data }) => {
      const { renderStatus } = this.state;
      let dataSource = data;
      if (!renderStatus) dataSource = this.parseDetails(dataSource);
      this.setState({
        dataSource,
      });
    });
  }

  async onSubmit(fields) {
    if (this.onSubmitStatus === false) return;
    const {
      save,
      update,
      match: { params: { id } },
      $util: { closeAndSwitchRefresh },
      pageTitle,
      fromMenu: { fromTitle } = {},
    } = this.props;
    const formatFields = this.parseFields(fields);
    this.onSubmitStatus = false;
    const { resultMsg } = await (!id || id.toString() === '0' ? save : update)(formatFields);
    this.onSubmitStatus = true;
    message.success(resultMsg);
    closeAndSwitchRefresh(pageTitle, fromTitle);
  }

  onDeleteModal(index) {
    this.goodsMap.splice(index, 1);
    this.forceUpdate();
  }

  onAddModal(item, hashKey) {
    const hashArr = hashKey.replace('goods.', '').split('.');
    const content = this.goodsMap[hashArr[0]][hashArr[1]];
    const { length } = content;
    const spliceArr = content.splice(Number(hashArr[2]) + 1);
    content.push(this.factoryContextTemplate(item.type, hashKey, length));
    this.goodsMap[hashArr[0]].content = [].concat(content, spliceArr);
    this.forceUpdate();
  }

  onRemoveModal(item, hashKey) {
    const hashArr = hashKey.replace('goods.', '').split('.');
    const content = this.goodsMap[hashArr[0]][hashArr[1]];
    content.splice(hashArr[2], 1);
    this.forceUpdate();
  }

  parseDetails(dataSource) {
    const {
      banner,
      confValue: { activityList, bannerList } = { activityList: [], bannerList: [] },
      storeId,
      storeName,
      startTime,
      endTime,
    } = dataSource;
    const mapLists = [];
    activityList.forEach(mode => {
      const mapList = { content: [] };
      const { activityLineList = [] } = mode;
      const { content } = mapList;
      mapList.title = {
        fieldKey: this.hashFieldKey(),
        value: mode.title && mode.title.imageUrlList[0],
      };

      activityLineList.forEach(obj => {
        const { lineType, lineContentList } = obj;
        const $obj = {
          type: ['one', 'two'][lineType - 1],
          ...obj,
          list: [],
        };
        const { list } = $obj;
        lineContentList.forEach(item => {
          list.push({
            fieldKey: this.hashFieldKey(),
            imageUrl: item.imageUrl,
            skuValue: {
              ...item,
              name: item.name,
              value: item.id,
            },
          });
        });
        content.push($obj);
      });
      mapLists.push(mapList);
    });
    if (dataSource.id) this.goodsMap = mapLists;
    this.setState({
      renderStatus: true,
    });
    return {
      ...dataSource,
      ...(banner ? {
        activityBannerList: banner.imageUrlList,
        activityWidth: banner.width,
        activityHeight: banner.height,
      } : {}),
      bannerList: bannerList[0],
      startTime: startTime && moment(startTime),
      endTime: endTime && moment(endTime),
      ...storeId ? {
        storeId: {
          id: storeId,
          value: storeId,
          key: storeId,
          label: storeName,
        },
      } : {},
    };
  }

  factoryModelTemplate() {
    const { hashFieldKey } = this;
    return {
      title: {
        fieldKey: hashFieldKey(),
      },
      content: [
        {
          type: 'one',
          list: [
            {
              fieldKey: hashFieldKey(),
            },
          ],
        },
        {
          type: 'two',
          list: [
            {
              fieldKey: hashFieldKey(),
            },
            {
              fieldKey: hashFieldKey(),
            },
          ],
        },
      ],
    };
  }

  parseFields(fields) {
    const confValue = {
      activityList: [],
      bannerList: Array.isArray(fields.bannerList) ? fields.bannerList : [fields.bannerList],
    };
    const { dataSource } = this.state;
    const { goodsMap } = this;
    const { activityList } = confValue;
    const { activityBannerList, activityWidth, activityHeight } = fields;
    goodsMap.forEach(mode => {
      const obj = {
        title: {
          imageUrlList: [fields[`${mode.title.fieldKey}title`]],
        },
        activityLineList: [],
      };
      activityList.push(obj);
      const { activityLineList } = obj;
      mode.content.forEach(item => {
        const obj$ = {
          lineType: item.type === 'one' ? 1 : 2,
          lineContentList: [],
        };
        activityLineList.push(obj$);
        item.list.forEach(c => {
          const imgurl = fields[`${c.fieldKey}image`];
          const goods = fields[`${c.fieldKey}goods`];
          obj$.lineContentList.push({
            imageUrl: imgurl,
            name: goods.name,
            skuType: goods.skuType,
            id: goods.id,
          });
        });
      });
    });
    return {
      id: dataSource.id,
      confValue,
      banner: {
        imageUrlList: !activityBannerList || Array.isArray(activityBannerList) ? activityBannerList : activityBannerList.split(','),
        width: activityWidth,
        height: activityHeight,
      },
      startTime: moment(fields.startTime).format('YYYY-MM-DD HH:mm:ss'),
      endTime: moment(fields.endTime).format('YYYY-MM-DD HH:mm:ss'),
      statusFlag: dataSource.statusFlag || 1,
      storeId: fields.storeId.key || '0',
      storeName: fields.storeId.label || '',
    };
  }

  factoryContextTemplate(type) {
    let obj;
    if (type === 'one') {
      obj = {
        type: 'one',
        list: [{
          fieldKey: this.hashFieldKey(),
        }],
      };
    } else {
      obj = {
        type: 'two',
        list: [{
          fieldKey: this.hashFieldKey(),
        }, {
          fieldKey: this.hashFieldKey(),
        }],
      };
    }
    return obj;
  }

  closeEdit() {
    const {
      $util: { closeAndSwitch }, pageTitle, fromMenu: {
        fromTitle,
      },
    } = this.props;
    closeAndSwitch(pageTitle, fromTitle);
  }

  addGoodsMode() {
    this.goodsMap.push(this.factoryModelTemplate(this.goodsMap.length));
    this.forceUpdate();
  }

  handleSearch(query) {
    const { dispatch } = this.props;
    dispatch({
      type: 'storeActivities/fetchStoreList',
      payload: {
        name: query,
      },
    });
  }

  renderStoreSearch(props, decoratorNode, fileEle, form) {
    const { storeId = {} } = form.getFieldsValue();
    return decoratorNode(
      DataEntry('select', {
        labelInValue: true,
        showSearch: true,
        defaultActiveFirstOption: false,
        showArrow: false,
        filterOption: false,
        onFocus: () => this.handleSearch(storeId.label || ''),
        onSearch: (...arg) => this.handleSearch(...arg),
        notFoundContent: null,
        children: [],
      })({ form }),
    );
  }

  renderAddGoodsMode(props, decoratorNode, fileEle, form) {
    const { renderStatus } = this.state;
    this.propsForm = form;
    if (!renderStatus) return null;
    return decoratorNode(
      <div className={styles['goods-model']}>
        <Button onClick={() => this.addGoodsMode()} type="primary">
          添加
        </Button>
        <span style={{ marginLeft: '10px' }}>
          添加统一模块（包含三种样式，小标题，2个一行，一个一行）
        </span>
        {this.renderGoods()}
      </div>,
    );
  }

  renderGoodsUpload(item, hashKey, text) {
    const form = this.propsForm;
    const { getFieldDecorator } = form;
    Object.assign(item, {
      hashKey,
    });
    const { fieldKey } = item;
    return (
      <Fragment>
        <FormItem>
          {getFieldDecorator(`${fieldKey}image`, {
            rules: [{ required: true, message: '图片必须上传' }],
            initialValue: item.imageUrl,
          })(
            DataEntry('upload', {
              maxLength: 1,
              btnText: `上传商品图片${text}`,
            })({ form }),
          )}
        </FormItem>
        <FormItem label={<span className={styles['label-cl']}>请选择商品</span>}>
          {getFieldDecorator(`${fieldKey}goods`, {
            rules: [rexRules.inputRequired],
            initialValue: item.skuValue,
          })(
            <GoodsSearchModel
              showKey="name"
              rowKey="id"
              multiple={false}
              skuApi="/global/search/w/api/sku/1/assembleQuery"
            />,
          )}
        </FormItem>
      </Fragment>
    );
  }

  renderModelPop(type, hashKey) {
    return (
      <div className={styles['add-mode-div']}>
        <div onClick={() => this.onAddModal({ type: 'two' }, hashKey)}>一排两个</div>
        <div onClick={() => this.onAddModal({ type: 'one' }, hashKey)}>一排一个</div>
      </div>
    );
  }

  renderTwoGoods(item, hashKey) {
    const { list } = item;
    Object.assign(item, {
      hash: hashKey,
    });
    return (
      <div className={styles['tools-model']}>
        <div className="flex flex-row">
          <div className="flex-1">
            {this.renderGoodsUpload(list[0], `${hashKey}.list.0`, '(建议上传346*346尺寸的图片)')}
          </div>
          <div style={{ width: '10px' }}/>
          <div className="flex-1">
            {this.renderGoodsUpload(list[1], `${hashKey}.list.1`, '(建议上传346*346尺寸的图片)')}
          </div>
        </div>
        <div className={styles['tools-con']}>
          <div className={styles['add-mode']}>
            <Icon type="plus"/>
            <div className={styles['add-mode-div-parent']}>
              {this.renderModelPop(item.type, hashKey)}
            </div>
          </div>
          <div onClick={() => this.onRemoveModal(item, hashKey)} className={styles['remove-mode']}>
            <Icon type="minus"/>
          </div>
        </div>
      </div>
    );
  }

  renderOneGoods(item, hashKey) {
    Object.assign(item, {
      hash: hashKey,
    });
    return (
      <div className={styles['tools-model']}>
        {this.renderGoodsUpload(item.list[0], `${hashKey}.list.0`, '(建议上传690*300尺寸的图片)')}
        <div className={styles['tools-con']}>
          <div className={styles['add-mode']}>
            <Icon type="plus"/>
            <div className={styles['add-mode-div-parent']}>
              {this.renderModelPop(item.type, hashKey)}
            </div>
          </div>
          <div onClick={() => this.onRemoveModal(item, hashKey)} className={styles['remove-mode']}>
            <Icon type="minus"/>
          </div>
        </div>
      </div>
    );
  }

  renderGoodsTitle(item, hashKey) {
    const form = this.propsForm;
    Object.assign(item, {
      hash: hashKey,
    });
    const addHashKey = hashKey.split('.');
    addHashKey.pop();
    addHashKey.push('content.-1');
    const { fieldKey } = item;
    const { getFieldDecorator } = form;
    return (
      <div className={styles['tools-model']}>
        <FormItem>
          {getFieldDecorator(`${fieldKey}title`, {
            rules: [rexRules.inputRequired],
            initialValue: item.value,
          })(
            DataEntry('upload', {
              maxLength: 1,
              btnText: '上传标题 (建议上传690*80尺寸的图片)',
            })({ form }),
          )}
        </FormItem>
        <div className={styles['tools-con']}>
          <div className={styles['add-mode']}>
            <Icon type="plus"/>
            <div className={styles['add-mode-div-parent']}>
              {this.renderModelPop(item, addHashKey.join('.'))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderGoodsModelContent(item, hashkey, index) {
    Object.assign(item, {
      hash: hashkey,
    });
    return (
      <div className={styles['model-div']}>
        {this.renderGoodsTitle(item.title, `${hashkey}.${index}.title`)}
        {item.content.map((obj, key) => {
          if (obj.type === 'one') {
            return this.renderOneGoods(obj, `${hashkey}.${index}.content.${key}`);
          } else if (obj.type === 'two') {
            return this.renderTwoGoods(obj, `${hashkey}.${index}.content.${key}`);
          }
          return null;
        })}
        <a onClick={() => this.onDeleteModal(index)} className={styles['delete-model']}>
          删除
        </a>
      </div>
    );
  }

  renderGoods() {
    const { goodsMap } = this;
    const fixKey = 'goods';
    return (
      <Fragment>
        {goodsMap.map((arr, index) => {
          return this.renderGoodsModelContent(arr, fixKey, index);
        })}
      </Fragment>
    );
  }

  render() {
    const { dataSource } = this.state;
    return (
      <Page
        className={styles['form-base']}
        layoutCol="1"
        getForm={saveRef(this, 'form')}
        layout="inline"
        fieldsStore={dataSource}
        rootContext={{
          app: this,
          renderStoreSearch: (...arg) => this.renderStoreSearch(...arg),
          renderAddGoodsMode: (...arg) => this.renderAddGoodsMode(...arg),
        }}
        onSubmit={(...arg) => this.onSubmit(...arg)}
        labelStyle={{ width: '120px' }}
      >
        <div style={{ width: '100%', paddingTop: '30px', textAlign: 'center' }}>
          <Button
            type="primary"
            onClick={() => {
              this.onSubmitStatus = true;
              this.form.onSubmit();
            }}
          >
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

export default StoreActivitiesEdit;
