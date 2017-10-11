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
      const uninstall = new Migration(config.install);

      // Run
      utility.log.info('uninstall.begin');
      uninstall.run(true).then(() => {
        utility.log.success('uninstall.complete');
        resolve();
      });
    });
    return p;
  },
};
