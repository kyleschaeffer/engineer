const sharepoint = require('../sharepoint');
const utility = require('../utility');

module.exports = {
  /**
   * Get current migration status
   * @type {void}
   */
  run() {
    utility.log.info('Analyzing...');
    sharepoint.list.get({
      title: '_migrations',
    }).then(() => {
      utility.log.success('Engineer is installed.\n');
    }).catch(() => {
      utility.log.warning('Engineer is not installed. Run "engineer install" to begin.\n');
    });
  },
};
