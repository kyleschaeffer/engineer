const status = require('../migrate/status');
const utility = require('../utility');

module.exports = {
  /**
   * Get current migration status
   * @return {Promise}
   */
  run() {
    const p = new Promise((resolve) => {
      // Get migration files
      const files = utility.file.readDir('migrations');

      // No migrations
      if (!files || !files.length) {
        utility.log.warning('migrate.empty');
        utility.error.fail();
      }

      // Get migration status
      status.get().then(() => {
        // Table rows
        const rows = [];

        // Get migration files
        files.forEach((file) => {
          const name = `${file.replace(/\.js$/i, '')}`;
          rows.push([
            name,
            status.history[name] && status.history[name].migrated ? utility.log.translate('status.migrated').green : utility.log.translate('status.pending').yellow,
          ]);
        });

        // Show table
        utility.log.table(rows);

        resolve();
      });
    });
    return p;
  },
};
