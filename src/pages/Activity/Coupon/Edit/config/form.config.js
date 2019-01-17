import React, { Fragment }  from 'react';
import * as rexRules from '@tools';
import {
  COUPON_TYPE,
  USE_CONDITION,
  USEFUL_TIME,
  PREFERENTIAL_OVERLAY,
  PARTAKE_TYPE,
} from '../../enum';

export default (root, { renderGoodsSelect}) => {
  const authorValidate = (key, value) => {
    let first = true;
    return () => {
      const fieldValue = root.props.form.getFieldsValue()[key];
      const status = fieldValue && fieldValue.toString() === value || first;
      first = false;
      return status;
    }
  };

  return [
    {
      col: 1,
      decorator: [
        {
          label: '优惠券名称',
          entry: {
            key: 'input',
          },
          filedDecorator: {
            key: 'name',
            rules: [rexRules.inputRequired],
          },
        },
        {
          label: '有效时间',
          entry: {
            key: 'moreEntry',
            col: 2,
            childrenEntry: [{
              layoutSpan: 8,
              entry: {
                key: 'select',
                children: { ...USEFUL_TIME },
              },
              filedDecorator: {
                key: 'validityTimeType',
                rules: [rexRules.inputRequired],
                initialValue: '1',
              },
            }, {
              author: authorValidate('validityTimeType', USEFUL_TIME.BY_INTERVAL.value),
              entry: {
                key: 'dateRange',
                format: 'YYYY-MM-DD hh:mm:ss',
                showTime: true,
              },
              filedDecorator: {
                key: 'time',
                rules: [
                  {
                    validator: (rule, value = {}, callback) => {
                      if (value.start && value.end) {
                        callback();
                      }
                      callback('请选择日期区间！');
                    },
                  },
                ],
              },
            }, {
              author: authorValidate('validityTimeType', USEFUL_TIME.BY_RECEIVE.value),
              entry: {
                key: 'input',
              },
              filedDecorator: {
                key: 'expireDate',
                rules: [rexRules.inputRequired],
              },
              render: (props, decoratorNode, fileEle, form ) => {
                return (
                  <div className="flex flex-row">
                    <div className="flex-1">{  decoratorNode(fileEle({ form })) }</div>
                    <span style={{marginLeft: '10px'}}>天</span>
                  </div>
                );
              },
            }],
          },
        }, {
          label: '使用条件',
          entry: {
            key: 'moreEntry',
            col: 2,
            childrenEntry: [{
              layoutSpan: 8,
              entry: {
                key: 'select',
                children: { ...USE_CONDITION },
              },
              filedDecorator: {
                key: 'useCondition',
                rules: [rexRules.inputRequired],
                initialValue: '1',
              },
              render: (props, decoratorNode, fileEle, form) => {
                return (
                  <div className="flex flex-row">
                    <span style={{marginRight: '10px'}}>按</span>
                    <div className="flex-1">
                      { decoratorNode(fileEle({ form })) }
                    </div>
                  </div>
                );
              },
            }, {
              entry: {
                key: 'input',
              },
              filedDecorator: {
                key: 'money',
                rules: [rexRules.inputRequired, rexRules.specialMoneyInput],
              },
            }],
          },
        },
        {
          label: '优惠方式',
          entry: {
            col: 2,
            key: 'moreEntry',
            childrenEntry: [{
              layoutSpan: 8,
              entry: {
                key: 'select',
                children: { ...COUPON_TYPE },
              },
              filedDecorator: {
                key: 'preferentialWay',
                rules: [rexRules.inputRequired],
                initialValue: '1',
              },
            }, {
              author: authorValidate('preferentialWay', COUPON_TYPE.DISCOUNT.value),
              entry: {
                key: 'input',
              },
              filedDecorator: {
                key: 'discountRate',
                rules: [rexRules.inputRequired, rexRules.minZoreToMaxOneHundred],
              },
              render: (props, decoratorNode, fileEle, form) => (
                <div className="flex flex-row">
                  <div className="flex-1">
                    { decoratorNode(fileEle({ form })) }
                  </div>
                  <div style={{ marginLeft: '10px' }}>%</div>
                </div>
              ),
            }, {
              author: authorValidate('preferentialWay', COUPON_TYPE.REDUCTION.value),
              entry: {
                key: 'input',
              },
              filedDecorator: {
                key: 'fullSub',
                rules: [rexRules.inputRequired, rexRules.specialMoneyInput],
              },
            }],
          },
        },
        {
          label: '是否与其他优惠重叠',
          entry: {
            col: 2,
            key: 'moreEntry',
            childrenEntry: [{
              layoutSpan: 8,
              entry: {
                key: 'select',
                children: { ...PREFERENTIAL_OVERLAY },
              },
              filedDecorator: {
                key: 'preferentialCal',
                rules: [rexRules.inputRequired],
                initialValue: '1',
              },
            }, {
              author: authorValidate('preferentialCal', PREFERENTIAL_OVERLAY.YES.value),
              entry: {
                key: 'checkboxGroup',
                children: [
                  { label: 'U豆', value: '1' },
                  { label: '爆款秒杀', value: '2' },
                ],
              },
              filedDecorator: {
                key: 'multiPreferential',
                initialValue: [],
              },
            }],
          },
        },
      ],
    },
    {
      col: 2,
      decorator: [
        {
          label: '最大优惠额',
          entry: {
            key: 'inputNumber',
            style: { width: '100%' },
          },
          filedDecorator: {
            key: 'maxPreferential',
            rules: [rexRules.inputRequired],
          },
        },
        {
          label: '优惠券总数',
          entry: {
            key: 'inputNumber',
            style: { width: '100%' },
          },
          filedDecorator: {
            key: 'totalCount',
            rules: [rexRules.inputRequired],
          },
        },
        {
          label: '单个ID领取数',
          entry: {
            key: 'inputNumber',
            style: { width: '100%' },
          },
          filedDecorator: {
            key: 'userLimit',
            rules: [rexRules.inputRequired],
          },
        },
      ],
    },
    {
      col: 1,
      decorator: [
        {
          label: '优惠券图片',
          entry: {
            key: 'upload',
            maxLength: 1,
          },
          filedDecorator: {
            key: 'banner',
            rules: [rexRules.inputRequired, rexRules.validFileLength(5)],
          },
        },
        {
          label: '参与方式',
          entry: {
            key: 'select',
            children: { ...PARTAKE_TYPE },
          },
          filedDecorator: {
            key: 'joinType',
            initialValue: '1',
          },
        },
        {
          author: authorValidate('joinType', PARTAKE_TYPE.BY_CATEGORY.value),
          item: {
            label: '请选择品类',
          },
          entry: {
            key: 'goodsCategoryTree',
            treeCheckable: true,
            labelInValue: true,
            titleName: 'name',
            valueName: 'id',
            treeDefaultExpandAll: true,
            dropdownStyle: { maxHeight: '300px' },
          },
          filedDecorator: {
            key: 'categoryDataList',
            rules: [rexRules.inputRequired],
          },
        },
        {
          author: authorValidate('joinType', PARTAKE_TYPE.BY_BRAND.value),
          item: {
            label: '请选择品牌',
          },
          entry: {
            key: 'goodsBrandSelect',
            mode: 'multiple',
            labelInValue: true,
            treeCheckable: true,
            labelName: 'name',
            valueName: 'id',
            dropdownStyle: { maxHeight: '300px' },
            rowKey: 'id',
            children: [],
          },
          filedDecorator: {
            key: 'brandDataList',
            rules: [rexRules.inputRequired],
          },
        },
        {
          author: authorValidate('joinType', PARTAKE_TYPE.BY_GOODS.value),
          label: '添加商品',
          render: renderGoodsSelect,
        },
      ],
    },
  ];
};
