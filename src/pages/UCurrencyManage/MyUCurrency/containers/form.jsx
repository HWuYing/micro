import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { Authorized } from '@components';
import CardStyle from '@components/particulate/Entry/CardStyle';
import { moneyToUCurrency } from '@tools';
import { PROJECT_CONFIG } from '@common/config';
import * as action from '../../store/action/index';
import RecentlyDetail from '../../PurchaseDetails/containers/recentlyDetail';
import image from '../image/ucurrency.png';

import style from '../index.less';

@connect(
  ({}) => ({}),
  {
    getDetails: action.statistics,
  }
)
class Edit extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      dataSource: {},
    };
  }

  async componentDidMount() {
    const { getDetails } = this.props;
    const dataSource = await getDetails();
    const { coinExchange } = dataSource;
    this.setState({
      dataSource: {
        ...dataSource,
        exchange: coinExchange ? coinExchange * 100 : 150,
      },
    });
  }

  payImmediatly() {
    const { dataSource } = this.state;

    this.props.$util.openPage({
      name: '立即充值',
      path: `/payment/ucurreny-pay/${dataSource.num || 0}/${dataSource.exchange || 150}`,
    });
  }

  render() {
    const {
      $util: { getHost },
    } = this.props;
    const { dataSource } = this.state;
    const { exchange } = dataSource;
    let host = getHost();
    host = /^(http|https)/.test(host) ? host : `http://${host}`;
    return (
      <Fragment>
        <div className={style['currencyContainer']}>
          <div className={style['left']}>
            <div>我的U币</div>
            <img src={`${host}${image}`} />
            <div>{moneyToUCurrency(dataSource.num, 100)}</div>
            <Authorized>
              <Button
                author={{ '!system': PROJECT_CONFIG.ENTERPRISE.platform }}
                type="primary"
                onClick={() => this.payImmediatly()}
              >
                立即充值
              </Button>
            </Authorized>
          </div>
          <div className={style['right']}>
            <div className={style['title']}>最近三个月U币统计</div>
            <div className={style['itemContainer']}>
              <div className={style['item']}>
                <div>购买U币</div>
                <div>{moneyToUCurrency(dataSource.paymentNum, 100)}</div>
              </div>
              <div className={style['item']}>
                <div>支出U币</div>
                <div>{moneyToUCurrency(0 - dataSource.disburseNum, 100)}</div>
              </div>
              <div className={style['item']}>
                <div>当前剩余U币</div>
                <div>{moneyToUCurrency(dataSource.num, 100)}</div>
              </div>
            </div>
          </div>
        </div>
        <CardStyle title="最近U币日志明细" style={{ width: '100%', height: '30px' }} />
        <RecentlyDetail />
      </Fragment>
    );
  }
}

export default Edit;
