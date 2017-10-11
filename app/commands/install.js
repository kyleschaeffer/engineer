const config = require('../config');
const Migration = require('../migrate/migration');
const status = require('../migrate/status');
const utility = require('../utility');

module.exports = {
  /**
   * Install Engineer
   * @return {Promise}
   */
  run() {
    const p = new Promise((resolve) => {
      // Get migration status
      status.get().then(() => {
        // Already installed
        if (status.installed) {
          utility.log.warning('install.already');
          utility.error.fail();
        }

        // Install migration
        const install = new Migration(config.install);

        // Run
        utility.log.info('install.begin');
        install.run().then(() => {
          utility.log.success('install.complete');
          resolve();
        });
      });
    });
    return p;
  },
};
