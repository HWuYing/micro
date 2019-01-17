import React from 'react';
import moment from 'moment';
import * as rexRules from '@tools';

export default (root, context) => {
  const { renderAddGoodsMode } = context;
  return [
    {
      label: '开始时间',
      entry: {
        key: 'datePicker',
        showTime: true,
        style: { width: '100%' },
        format: 'YYYY-MM-DD HH:mm:ss',
        disabledDate: (({ app }) => {
          return current => {
            const fields = (app.propsForm && app.propsForm.getFieldsValue()) || {};
            const { endTime } = fields;
            const date = new Date();
            return (
              (current && current < moment(date.setDate(date.getDate() - 1)).endOf('day')) ||
              (endTime && current > moment(endTime))
            );
          };
        })(context),
      },
      filedDecorator: {
        key: 'startTime',
        rules: [rexRules.inputRequired],
      },
    },
    {
      label: '结束时间',
      entry: {
        key: 'datePicker',
        showTime: true,
        style: { width: '100%' },
        format: 'YYYY-MM-DD HH:mm:ss',
        disabledDate: (({ app }) => {
          return current => {
            const fields = (app.propsForm && app.propsForm.getFieldsValue()) || {};
            const { startTime } = fields;
            return (
              (current && current < moment().endOf('day')) ||
              (startTime && current <= moment(startTime))
            );
          };
        })(context),
      },
      filedDecorator: {
        key: 'endTime',
        rules: [rexRules.inputRequired],
      },
    },
    {
      label: '指定门店',
      entry: {
        key: 'storeSelect',
        // mode: 'multiple',
        labelName: 'name',
        valueName: 'id',
        children: [],
        showSearch: true,
        labelInValue: true,
        filterOption: (input, { props: { children = ''} }) => {
          return children.indexOf(input) !== -1;
        },
      },
      filedDecorator: {
        key: 'storeId',
      },
    },
    {
      label: '活动banner',
      entry: {
        key: 'upload',
        maxLength: 1,
        btnText: '建议上传992*192尺寸的图片',
      },
      filedDecorator: {
        key: 'activityBannerList',
        rules: [rexRules.selectRequired],
      },
    },{
      label: 'banner图片长宽',
      entry: {
        key: 'moreEntry',
        col: 3,
        childrenEntry: [{
          layoutSpan: 11,
          entry: {
            key: 'inputNumber',
            style: { width: '100%' },
          },
          filedDecorator: {
            key: 'activityWidth',
            initialValue: '992',
          },
        }, {
          layoutSpan: 2,
          entry: {
            key: 'text',
            target: 'div',
            children: '*',
            style: { textAlign: 'center' },
          },
        }, {
          layoutSpan: 11,
          entry: {
            key: 'inputNumber',
            style: { width: '100%' },
          },
          filedDecorator: {
            key: 'activityHeight',
            initialValue: '192',
          },
        }],
      },
      render: (props, decoratorNode, fileEle, form) => {
        return (
          <div className="flex flex-row">
            <div className="flex-1">
              {decoratorNode(fileEle({ form }))}
            </div>
            <div>
              (像素)
            </div>
          </div>
        )
      },
    },
    {
      label: '配置活动标题',
      entry: {
        key: 'upload',
        maxLength: 1,
        className: 'store-activity-title',
        btnText: '建议上传690*780尺寸的图片',
      },
      filedDecorator: {
        key: 'bannerList',
        rules: [rexRules.selectRequired],
      },
    },
    {
      label: '配置活动内容',
      entry: {
        key: 'text',
        maxLength: 1,
      },
      filedDecorator: {
        key: 'action',
        rules: [rexRules.selectRequired],
        initialValue: '001',
      },
      render: renderAddGoodsMode,
    },
  ];
};
