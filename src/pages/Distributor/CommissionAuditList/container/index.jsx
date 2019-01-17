import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { reducer } from '@applyStore';
import PageLayout from '@layouts/PageLayout';
import CommissionList from '../../../components/DistributorCommissionList/container';
import { action, reducers } from '../../store';

@connect(({ distributorManage : { withdrawMap }}) => ({ withdrawMap }), {
  getWithdrawList: action.getWithdrawList,
})
@reducer('distributorManage', reducers)
class List extends PureComponent {
  onEdit(record, pageTitle = '经销商佣金提现') {
    const { $util: { closeAndOpen } } = this.props;
    const { id } = record;
    closeAndOpen(pageTitle, {
      name: pageTitle,
      path: `/distributor-manage/commission/${id}`,
    });
  }

  async fetchList(fields) {
    const { getWithdrawList } = this.props;
    await getWithdrawList(fields);
  }

  render() {
    const { withdrawMap, ...reset } = this.props;
    return (
      <PageLayout>
        <CommissionList
          {...reset}
          onEdit={(...arg) => this.onEdit(...arg)}
          isHeadFixed
          sourceMap={withdrawMap}
          fetchList={(...arg) => this.fetchList(...arg)}
        />
      </PageLayout>
    );
  }
}

export default List;
