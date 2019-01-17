import React, { PureComponent } from 'react';
import { Divider, message, Card } from 'antd';
import { particulate } from '@components';
import BasicCommissionProportion from '../../BasicCommissionProportion';
import { tableConfig } from '../config';

const { createEditTable } = particulate;
const Table = createEditTable(tableConfig, false);

class CompanyCommissionProportion extends BasicCommissionProportion {
  constructor(props, context) {
    super(props, context);
    this.state = {
      source: [{ key1: '1个创客' }],
    };
  }

  validate() {
    return super.validate(['proportion1']);
  }

  render() {
    const { source } = this.state;
    return (
      <Card bordered={false} title="装企/服务商链路">
        <div ref={() => this.getRef()}>
          此处百分比表示装企将利润的多少用作创客佣金的分配，此处按商品实付金额计算，需扣除优惠
        </div>
        <Divider />
        <div style={{ width: '400px' }}>
          <Table
            rootContext={{
              renderEllInput: (...arg) => this.renderEllInput(...arg),
            }}
            dataSource={source}
          />
        </div>
      </Card>
    );
  }
}

export default CompanyCommissionProportion;
