const config = require('../config');
const Migration = require('../migrate/migration');
const status = require('../migrate/status');
const utility = require('../utility');

module.exports = {
  /**
   * Install Engineer
   * @return {void}
   */
  run() {
    status.get().then(() => {
      // Already installed
      if (status.installed) {
        utility.log.warning({
          level: 3,
          key: 'install.already',
        });
        utility.log.fail();
      }

      // Install migration
      const install = new Migration(config.install);

      // Run
      utility.log.info({
        level: 2,
        key: 'install.begin',
      });
      utility.log.indent();
      install.run().then(() => {
        utility.log.outdent();
        utility.log.info({
          level: 3,
          key: 'install.complete',
        });
      });
    });
  },
};
