const processEnv = process.env;
const {
  __JAVA_HOST__,
  __PORT__,
  REDIS_HOST,
  REDIS_PORT,
  __API_VERSION__,
  __PLATFORM__,
  __SYSTEM_NAME__,
} = require('./default.env');

const isMicro = process.argv.includes('--micro');

module.exports = {
  __JAVA_HOST__: processEnv.javaHost || `"${__JAVA_HOST__}"`,
  __PORT__: processEnv.port || __PORT__, // 服务器监听端口
  REDIS_HOST: processEnv.redisHost || `"${REDIS_HOST}"`,
  REDIS_PORT: processEnv.redisHost || REDIS_PORT,
  __API_VERSION__: processEnv.apiVersion || __API_VERSION__,
  __PLATFORM__: processEnv.systemPlatform || `"${__PLATFORM__}"`,
  __SYSTEM_NAME__: processEnv.systemName || `"${__SYSTEM_NAME__}"`,
  __IS_MICRO__: isMicro,
};

console.log('API地址(jenkins配置)javaHost: '+(processEnv.javaHost ));
