const config = require('../config');
const sharepoint = require('../sharepoint');
const utility = require('../utility');

module.exports = {
  /**
   * Uninstall Engineer
   * @return {void}
   */
  run() {
    sharepoint.list.get({
      onStart: () => {
        utility.log.info('Analyzing site...');
      },
      title: config.sharepoint.lists.migrations,
    }).then(() => {
      utility.log.success('done.\n');
      sharepoint.list.delete({
        onStart: () => {
          utility.log.info('Removing Engineer lists...');
        },
        title: config.sharepoint.lists.migrations,
      }).then(() => {
        utility.log.success('done.\nEngineer has been uninstalled.\n');
      }).catch((response) => {
        utility.log.error('done.\n');
        utility.error.handle(response);
      });
    }).catch(() => {
      utility.log.warning('done.\nEngineer is not installed.\n');
    });
  },
};
