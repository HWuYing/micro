import React, { PureComponent } from 'react';
import { message } from 'antd';

class BasicCommissionProportion extends PureComponent {
  getRef() {
    const { getRef=() => null } = this.props;
    getRef(this);
  }

  parseDetails(sourceData = []) {
    this.setState({
      source: sourceData.map((item, index) => {
        return {
          ...item,
          key1: `${['一', '二', '三'][index]}个创客`,
        };
      }),
    });
  }

  validateSum(fields, item) {
    let sum = 0;
    const $obj = {
      status: true,
      message: '',
    };
    fields.forEach(key => {
      if (!item[key] && item[key] !== 0) {
        $obj.status = false;
        $obj.message = '存在必填项没填写';
      }
      sum += Number(item[key]);
    });
    if ($obj.status && sum > 100) {
      $obj.message = '存在相加大于100的行';
      $obj.status = false;
    }
    return $obj;
  }

  validate(fields) {
    const { source } = this.state;
    let messageStr = '';
    let status = true;
    source.some(item => {
      const { status: __status, message: __message } = this.validateSum(fields, item);
      status = __status;
      messageStr = __message;
      return !status;
    });
    if (messageStr) message.error(messageStr);
    return !status ? status : source;
  }

  renderEllInput(children) {
    return (
      <div className="flex flex-row align-item-center">
        <div className="flex-1">
          {children}
        </div>
        <div>%</div>
      </div>
    );
  }

  render() {
    return null;
  }
}

export default BasicCommissionProportion;
