const path = require('path');
const cwd = process.cwd();
const libPath = 'fe-library/lib';

module.exports = {
  resolve: {
    alias: {
      '@libGlobal': `${libPath}/global`,
      '@libCommon': `${libPath}/common`,
      '@mixin': `${libPath}/util/mixin`, // path.join(cwd, 'src/util/mixin'),
      '@common': path.join(cwd, 'src/common'),
      '@globalModel': path.join(cwd, 'src/global'),
      '@assets': path.join(cwd, 'src/assets'),
      '@particulate': `${libPath}/util/particulate`, // path.join(cwd, 'src/util/particulate'),
      '@fetch': `${libPath}/util/fetch`, // path.join(cwd, 'src/util/fetch'),
      '@tools': `${libPath}/util/tools`, // path.join(cwd, 'src/util/tools'),
      '@pages': path.join(cwd, 'src/pages'),
      '@pageModel': `${libPath}/pageModel`, // path.join(cwd, 'src/pageModel'),
      '@modalModel': `${libPath}/modalModel`, // path.join(cwd, 'src/pageModel'),
      '@model': `${libPath}/model`, // path.join(cwd, 'src/pageModel'),
      '@components': `${libPath}/components`, // path.join(cwd, 'src/components'),
      '@layouts': `${libPath}/layouts`, // path.join(cwd, 'src/layouts'),
      '@applyStore': `${libPath}/util/applyStore`, // path.join(cwd, 'src/util/applyStore'),
      '@applyComponent': `${libPath}/util/applyComponent`, // path.join(cwd, 'src/util/applyComponent'),
      '@enumGlobal': `${libPath}/enumGlobal`,
      '@asyncModule': `${libPath}/util/tools/asyncModule`,
    },
  },
};
