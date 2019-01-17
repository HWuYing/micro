import React, { Fragment } from 'react';
import * as rexRules from '@tools';

export default () => {
  return [
    {
      col: 2,
      decorator: [
        {
          label: '兑换比例',
          entry: {
            key: 'inputNumber',
            min:0,
            disabled: true,
          },
          filedDecorator: {
            key: 'exchange',
            rules: [rexRules.inputRequired],
          },
          render: (props, decoratorNode, fileEle, form) => {
            return (
              <Fragment>
                <div style={{ marginLeft: '10px' }} className="flex flex-row">
                  <div>1 :</div>
                  <div style={{ marginLeft: '10px' }} className="flex-1">
                    { decoratorNode(fileEle({ form }))}
                  </div>
                </div>
                <div style={{ whiteSpace: 'nowrap' }}>按照比例换算如：1：25，就是1元钱可以充值为25个U币</div>
              </Fragment>
            )
          },
        },
      ],
    },
  ];
};
