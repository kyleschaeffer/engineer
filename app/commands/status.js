const sharepoint = require('../sharepoint');
const utility = require('../utility');

module.exports = {
  /**
   * Get current migration status
   * @return {void}
   */
  run() {
    sharepoint.list.get({
      onStart: () => {
        utility.log.info('Analyzing site...');
      },
      title: '_migrations',
    }).then(() => {
      utility.log.success('done.\nEngineer is installed.\n');
    }).catch(() => {
      utility.log.warning('done.\nEngineer is not installed. Run "engineer install" to begin.\n');
    });
  },
};
