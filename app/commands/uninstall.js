const config = require('../config');
const Migration = require('../migrate/migration');
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

      const uninstall = new Migration({
        down(engineer) {
          // Delete migrations list
          engineer.list.delete(config.sharepoint.lists.migrations);

          // Delete manifest list
          engineer.list.delete(config.sharepoint.lists.manifest);
        },
      });

      uninstall.run(true);
    }).catch(() => {
      utility.log.warning('done.\nEngineer is not installed.\n');
    });
  },
};
