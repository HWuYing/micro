module.exports = {
  'apps': [{
    'name': 'micro-base',
    'script': './build/server.js',
    'env': {
      'NODE_ENV': 'production',
    },
    'instances': 'max',
    'exp_backoff_restart_delay': '20',
    'max_memory_restart': '1G',
  }],
};
