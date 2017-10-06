const config = require('../config');
const sharepoint = require('../sharepoint');
const utility = require('../utility');

module.exports = {
  /**
   * Get current migration status
   * @return {Promise}
   */
  run() {
    const p = new Promise((resolve) => {
      sharepoint.list.get({
        onError: () => {
          utility.log.warning('done.\nEngineer is not installed. Use "engineer install" to get started.\n');
        },
        onStart: () => {
          utility.log.info('Analyzing site...');
        },
        onSuccess: () => {
          utility.log.success('done.\nEngineer is installed.\n');
        },
        title: config.sharepoint.lists.migrations,
      }).then(() => {
        resolve();
      });
    });
    return p;
  },
};
