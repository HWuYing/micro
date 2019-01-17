import React, { PureComponent } from 'react';
import { particulate, SearchForm } from '@components';
import { createStandardModal } from '@modalModel';
import { createStandard } from '@model';
import { fetch } from '@util';
import { formConfig, tableConfig } from '../config/standrad.config';

const { createStandardTable } = particulate;

class SkuSelectModal extends  PureComponent {
  constructor(props, context) {
    super(props, context);
    const { multiple } = props;
    this.SkuModal = createStandardModal(createStandard(
      SearchForm(formConfig, undefined),
      createStandardTable(tableConfig, undefined, {
        ...(!multiple && multiple !== false  ? {} : { multiple }),
        rowKey: props.rowKey,
      })
    ), {
      width: 1000,
      title: '选择商品',
      destroyOnClose: true,
    });

    this.state = {
      dataSource: [],
      total: 0,
    };
  }

  getModal(m) {
    const { getModal } = this.props;
    if (getModal) getModal(m);
    this.modal = m;
  }

  fetchGoodsList(fields) {
    const { skuApi } = this.props;
    fetch.post(skuApi, { body: fields }).then(({ data, total }) => {
      this.setState({
        dataSource: data,
        total,
      });
    });
  }

  render() {
    const { SkuModal } = this;
    const { onOk } = this.props;
    const { dataSource, total } = this.state;
    return (
      <SkuModal
        layoutCol="2"
        getModal={(...arg) => this.getModal(...arg)}
        dataSource={dataSource}
        total={total}
        onOk={(...arg) => onOk && onOk(...arg)}
        fetchList={(...arg) => this.fetchGoodsList(...arg)}
      />
    );
  }
}

export default SkuSelectModal;
