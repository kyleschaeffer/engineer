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
        utility.log.warning({
          level: 3,
          key: 'uninstall.already',
        });
        utility.log.fail();
      }

      // Uninstall migration
      const uninstall = new Migration(config.install);

      // Run
      utility.log.info({
        level: 2,
        key: 'uninstall.begin',
      });
      utility.log.indent();
      uninstall.run(true).then(() => {
        utility.log.outdent();
        utility.log.info({
          level: 3,
          key: 'uninstall.complete',
        });
      });
    });
  },
};
