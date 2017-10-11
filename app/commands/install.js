const config = require('../config');
const Migration = require('../migrate/migration');
const utility = require('../utility');

module.exports = {
  /**
   * Install Engineer
   * @return {Promise}
   */
  run() {
    const p = new Promise((resolve) => {
      // Install migration
      const install = new Migration(config.install);

      // Run
      utility.log.info('install.begin');
      install.run().then(() => {
        utility.log.success('install.complete');
        resolve();
      });
    });
    return p;
  },
};
