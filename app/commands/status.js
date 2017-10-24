const status = require('../migrate/status');
const utility = require('../utility');

module.exports = {
  /**
   * Get current migration status
   * @return {void}
   */
  run() {
    // Get migration files
    const files = utility.file.readDir('migrations');

    // No migrations
    if (!files || !files.length) {
      utility.log.warning({
        level: 3,
        key: 'migrate.empty',
      });
      utility.log.fail();
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
          status.history[name] && status.history[name].Migrated ? utility.log.translate('status.migrated') : utility.log.translate('status.pending'),
        ]);
      });

      // Show table
      utility.log.table(rows);

      // Not installed
      if (!status.installed) {
        utility.log.warning({
          level: 3,
          key: 'status.uninstalled',
        });
      }
    });
  },
};
