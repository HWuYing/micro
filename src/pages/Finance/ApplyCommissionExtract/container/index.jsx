import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Divider } from 'antd';
import { moneyToYuan } from '@tools';
import { Authorized } from '@components';
import { PROJECT_CONFIG } from '@common/config';
import { reducer } from '@applyStore';
import { COMMISSION_STATUS } from '../../enum';
import CommissionList from '../../../components/CommissionList/container';
import { action, reducers } from '../../store';
import styles from './index.less';

@connect(({ financeManage: { withdrawMap, statistics } }) => ({ withdrawMap, statistics }), {
  getWithdrawList: action.getStoreWithdrawList,
  getCompanyAchievementInfo: action.getCompanyAchievementInfo,
})
@reducer('financeManage', reducers)
class List extends PureComponent {
  componentDidMount() {
    const { getCompanyAchievementInfo } = this.props;
    getCompanyAchievementInfo();
  }

  onEdit(record) {
    const pageTitle = '提现详情';
    const { $util: { closeAndOpen } } = this.props;
    const { id } = record;
    closeAndOpen(pageTitle, {
      name: pageTitle,
      path: `/finance-manage/apply-put-forward/${id}`,
    });
  }

  applyPutForward(pageTitle) {
    const { $util: { closeAndOpen } } = this.props;
    closeAndOpen(pageTitle, {
      name: pageTitle,
      path: `/finance-manage/apply-put-forward`,
    });
  }

  async fetchList(fields) {
    const { getWithdrawList } = this.props;
    const { enumKey, ...reset } = fields;
    getWithdrawList({
      state: COMMISSION_STATUS[enumKey].value,
      ...reset,
      enumKey,
      status: undefined,
    });
  }

  renderApply() {
    const { statistics, isMarketing } = this.props;
    const {
      totalAmount = 0,
      availableAmount = 0,
      waitAmount = 0,
      toAccountAmount = 0,
    } = statistics;
    return (
      <Authorized author={{ isMarketing }}>
        <div
          author={[
            { '!system' : PROJECT_CONFIG.ERP.platform },
            {
              system: PROJECT_CONFIG.ERP.platform,
              isMarketing: true,
            },
          ]}
          style={{ width: '100%', overflow: 'hidden' }}
        >
          <Row gutter={16}>
            <Col span={5}>
              <div className={styles['statistics-money']}>{moneyToYuan(totalAmount, 0)}</div>
            </Col>
            <Col span={5}>
              <div className={styles['statistics-money']}>{moneyToYuan(availableAmount, 0)}</div>
            </Col>
            <Col span={5}>
              <div className={styles['statistics-money']}>{moneyToYuan(waitAmount, 0)}</div>
            </Col>
            <Col span={5}>
              <div className={styles['statistics-money']}>{moneyToYuan(toAccountAmount, 0)}</div>
            </Col>
            <Col span={4}>
              <Button className={styles['statistics-button']} type="primary" onClick={() => this.applyPutForward('申请提现')}>
                申请提现
              </Button>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={5}>
              <div className={styles['statistics-text']}>
                累计结算总额
                <div className={styles['statistics-info']}>万千平台结算给门店的历史总额</div>
              </div>
            </Col>
            <Col span={5}>
              <div className={styles['statistics-text']}>
                账户可提现金额
                <div className={styles['statistics-info']}>当前账号可以申请提现的最大额度</div>
              </div>
            </Col>
            <Col span={5}>
              <div className={styles['statistics-text']}>
                待结算提现金额
                <div className={styles['statistics-info']}>已经申请提现等待平台处理的金额</div>
              </div>
            </Col>
            <Col span={5}>
              <div className={styles['statistics-text']}>
                提现总计
                <div className={styles['statistics-info']}>成功提现的历史总额统计</div>
              </div>
            </Col>
          </Row>
          <Divider />
        </div>
      </Authorized>
    );
  }

  render() {
    const { withdrawMap, ...reset } = this.props;
    return (
      <div className="flex-1">
        {this.renderApply()}
        <CommissionList
          {...reset}
          onEdit={(...arg) => this.onEdit(...arg)}
          isHeadFixed={false}
          sourceMap={withdrawMap}
          fetchList={(...arg) => this.fetchList(...arg)}
        />
      </div>
    );
  }
}

export default List;
