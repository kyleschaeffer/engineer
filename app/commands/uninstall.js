const config = require('../config');
const Migration = require('../migrate/migration');
const status = require('../migrate/status');
const utility = require('../utility');

module.exports = {
  /**
   * Uninstall Engineer
   * @return {void}
   */
  run() {
    // Get migration status
    status.get().then(() => {
      // Already uninstalled
      if (!status.installed) {
        utility.log.warning('uninstall.already');
        utility.log.fail();
      }

      // Uninstall migration
      const uninstall = new Migration(config.install);

      // Run
      utility.log.info('uninstall.begin', {});
      uninstall.run(true).then(() => {
        utility.log.success('uninstall.complete');
      });
    });
  },
};
