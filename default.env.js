// const host = 'http://testerp.wanqian.store/erp/';
const host = 'http://192.168.122.171:8080';

module.exports = {
  __JAVA_HOST__: host, // java api地址
  __PORT__: 3104, // 服务器监听端口
  REDIS_HOST: 'localhost', // redis服务器地址
  REDIS_PORT: 6379, // redis 服务器端口
  __API_VERSION__: 1, // api版本
  __PLATFORM__: 'ADMIN_SYSTEM', // 系统分类 WANQIAN_SYSTEM 装企 DECOR_SYSTEM
  __SYSTEM_NAME__: '后台管理系统',
};
