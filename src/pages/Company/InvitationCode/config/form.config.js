import React, { Fragment } from 'react';
import { download } from '@util';

const author = {
  '!distributeFlag': '2',
};

export default () => ({
  col: 1,
  decorator: [{
    author: {
      distributeFlag: '2',
    },
    entry: {
      key: 'text',
    },
    render: () => (<div>您的邀请码暂时未开通，请拨打联系：13558841157</div>),
  }, {
    author,
    item: {
      label: '注册邀请码',
    },
    entry: {
      key: 'text',
    },
    filedDecorator: {
      key: 'invitationCode',
    },
  }, {
    author,
    item: {
      label: '邀请二维码',
    },
    entry: {
      key: 'image',
      width: '280px',
      height: '280px',
    },
    filedDecorator: {
      key: 'qrCode',
    },
    render: (props, decoratorNode, fileEle, form) => {
      return (
        <Fragment>
          {decoratorNode(fileEle({ form }))}
          <a onClick={() => download(form.getFieldsValue().qrCode, 'qr.jpg')}>
            将二维码保存为图片
          </a>
        </Fragment>
      );
    },
  }, {
    author,
    item: {
      label: '小程序邀请码',
      labelStyle: { width: '85px' },
    },
    entry: {
      key: 'image',
      width: '280px',
      height: '280px',
    },
    filedDecorator: {
      key: 'weixinAppCode',
    },
    render: (props, decoratorNode, fileEle, form) => {
      return (
        <Fragment>
          {decoratorNode(fileEle({ form }))}
          <a onClick={() => download(form.getFieldsValue().weixinAppCode, 'qr.jpg')}>
            将二维码保存为图片
          </a>
        </Fragment>
      );
    },
  }],
});
