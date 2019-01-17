import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import store, { ApplyProvider } from '@applyStore';
import mixin from '@mixin';
import { Loading, Error } from '@components';
import { ConnectedRouter } from 'react-router-redux';
import RouterConfig from './router';
import './default.less';
import '../global';
import '../components/Entry';

mixin(Component);

class App extends Component{
  static childContextTypes = {
    author: PropTypes.object,
  };

  getChildContext() {
    const { author } = this.props;
    return {
      author,
    };
  }

  render() {
    const { props } = this;
    return (
      <Fragment>
        <ApplyProvider store={store}>
          <LocaleProvider locale={zhCN}>
            <ConnectedRouter {...props}>
              <RouterConfig {...props} />
            </ConnectedRouter>
          </LocaleProvider>
        </ApplyProvider>
        <Loading />
        <Error history={props.history} />
      </Fragment>
    );
  }
}

export default App;
