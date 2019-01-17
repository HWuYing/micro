const path = require('path');
const env = require('../env.config');
const libPath = 'fe-library/lib';
const { __IS_MICRO__ } = env;
const cwd = process.cwd();

module.exports = {
  ...(__IS_MICRO__
    ? {
        entry: {
          client: ['@babel/polyfill', path.join(cwd, 'src/client/microApp')],
        },
      }
    : {}),
  resolve: {
    alias: {
      'node-fetch': 'whatwg-fetch',
      '@util': `${libPath}/util/client`, // path.join(cwd, 'src/util/client'),
    },
  },
  externals: {
    ...(__IS_MICRO__
      ? {
          antd: 'window.app.antd',
          'ali-oss': 'window.app["ali-oss"]',
          react: 'window.app.react',
          'react-dom': 'window.app["react-dom"]',
          'react-amap': 'window.app["react-amap"]',
          'react-dnd': 'window.app["react-dnd"]',
          'react-dnd-html5-backend': 'window.app["react-dnd-html5-backend"]',
          '@asyncModule': 'window.app["asyncModule"]',
          '@mixin': 'window.app.mixin', // path.join(cwd, 'src/util/mixin'),
          // '@applyStore': 'window.app.applyStore', // path.join(cwd, 'src/util/applyStore'),
          '@applyComponent': 'window.app.applyComponent', // path.join(cwd, 'src/util/applyComponent'),
        }
      : {}),
  },
};
