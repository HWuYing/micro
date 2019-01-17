import React, { PureComponent, Fragment } from 'react';
import { Input, message } from 'antd';
import { component } from '@particulate';
import { isObject } from '@tools';
import SkuSelectModal from '../../SkuSelectModal/container';

const { saveRef } = component;
const { Search } = Input;

class GoodsSearchModel extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: props.value || undefined,
      selectedRowKeys: [],
    };
    this.bindOnSearch = this.onSearch.bind(this);
    this.bindOnModalOk = this.onModalOk.bind(this);
    this.initial(props);
  }

  componentWillReceiveProps(nextProps) {
    this.initial(nextProps);
  }

  onChange(value) {
    const { onChange } = this.props;
    if (onChange) onChange(value);
  }

  onModalOk(selectedRowKeys, selectedRows) {
    const { multiple } = this.props;
    if (!selectedRowKeys.length) {
      message.warning('请选择商品!');
      return false;
    }
    const propsValue = multiple === false ? selectedRows[0] : selectedRows;
    this.setState({
      ...this.parseState(propsValue),
    }, this.onChange(propsValue));
  }

  onSearch() {
    this.modal.onShow(true);
  }

  parseState(value) {
    const { showKey, rowKey } = this.props;
    const selectedRowKeys = [];
    let parseValue = value;
    if (Array.isArray(value)) {
      parseValue = value.map(item => {
        if (rowKey) selectedRowKeys.push(item[rowKey]);
        return item[showKey];
      }).join(',');
    } else if (isObject(value)) {
      if (rowKey) selectedRowKeys.push(value[rowKey]);
      parseValue = value[showKey];
    }
    return {
      value: parseValue,
      selectedRowKeys,
    };
  }

  initial(props) {
    const { value } = props;
    this.setState({
      ...this.parseState(value),
    })
  }

  render() {
    const { value, selectedRowKeys } = this.state;
    const { placeholder, skuApi, rowKey, multiple } = this.props;

    return (
      <Fragment>
        <div onClick={this.bindOnSearch}>
          <Search
            disabled
            value={value}
            placeholder={placeholder}
            onSearch={this.bindOnSearch}
            onClick={this.bindOnSearch}
          />
        </div>
        <SkuSelectModal
          getModal={saveRef(this, 'modal')}
          skuApi={skuApi}
          multiple={multiple}
          onOk={this.bindOnModalOk}
          selectedRowKeys={selectedRowKeys}
          rowKey={rowKey}
        />
      </Fragment>
    );
  }
}

export default GoodsSearchModel;
