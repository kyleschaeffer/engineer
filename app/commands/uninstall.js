const config = require('../config');
const Migration = require('../migrate/migration');
const utility = require('../utility');

module.exports = {
  /**
   * Uninstall Engineer
   * @return {Promise}
   */
  run() {
    const p = new Promise((resolve) => {
      // Uninstall migration
      const uninstall = new Migration({
        down(engineer) {
          engineer.list.delete(config.sharepoint.lists.migrations);
          engineer.list.delete(config.sharepoint.lists.manifest);
        },
      });

      // Run
      uninstall.run(true).then(() => {
        utility.log.success('Uninstall complete.\n');
        resolve();
      });
    });
    return p;
  },
};
