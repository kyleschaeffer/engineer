const fs = require('fs');
const status = require('../migrate/status');
const utility = require('../utility');

module.exports = {
  /**
   * Get current migration status
   * @return {Promise}
   */
  run() {
    const p = new Promise((resolve) => {
      // No migrations (folder doesn't exist)
      if (!utility.file.exists('migrations')) {
        utility.log.warning('migrate.empty');
        utility.error.fail();
      }

      // Get migration files
      const files = fs.readdirSync(utility.file.path('migrations'));

      // No migrations
      if (!files.length) {
        utility.log.warning('migrate.empty');
        utility.error.fail();
      }

      // Get migration status
      status.get().then(() => {
        // Get migration files
        files.forEach((file) => {
          // Get migration name
          const name = `${file.replace(/\.js$/i, '')}`;
          utility.log.info('status.migration', { migration: name });

          // Display migration status
          if (!status.history[name] || !status.history[name].migrated) utility.log.warning('status.pending');
          else utility.log.success('status.migrated');
        });

        resolve();
      });
    });
    return p;
  },
};
