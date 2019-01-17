import React from 'react';
import { Divider, Card } from 'antd';
import { particulate } from '@components';
import BasicCommissionProportion from '../../BasicCommissionProportion';
import { tableConfig } from '../config';

const { createEditTable } = particulate;
const Table = createEditTable(tableConfig, false);

class StoreCommissionProportion extends BasicCommissionProportion {
  constructor(props, context) {
    super(props, context);
    this.state = {
      source: [{ key1: '1个创客' }, { key1: '2个创客' }, { key1: '3个创客' }],
    };
  }

  validate() {
    return super.validate(['proportion1', 'proportion2', 'proportion3']);
  }

  render() {
    const { source } = this.state;
    return (
      <Card bordered={false} title="门店链路">
        <div ref={() => this.getRef()}>
          此处百分比表示门店将利润的多少用作创客佣金的分配，此处按商品实付金额计算，需扣除优惠，每行相加最大不超过100%
        </div>
        <Divider />
        <Table
          rootContext={{
            renderEllInput: (...arg) => this.renderEllInput(...arg),
          }}
          dataSource={source}
        />
      </Card>
    );
  }
}

export default StoreCommissionProportion;
