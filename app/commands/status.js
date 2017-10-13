const status = require('../migrate/status');
const utility = require('../utility');
const sharepoint = require('../sharepoint');

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

      sharepoint.auth.authenticate().then(() => {
        status.get().then(() => {
          // Table rows
          const rows = [];

          // Get migration files
          files.forEach((file) => {
            const name = `${file.replace(/\.js$/i, '')}`;
            rows.push([
              name,
              status.history[name] && status.history[name].Migrated ? utility.log.translate('status.migrated').green : utility.log.translate('status.pending').yellow,
            ]);
          });

          // Show table
          utility.log.table(rows);

          // Not installed
          if (!status.installed) {
            utility.log.warning('status.uninstalled');
          }

          resolve();
        }).catch(utility.error.handle);
      }).catch(utility.error.handle);
    });
    return p;
  },
};
