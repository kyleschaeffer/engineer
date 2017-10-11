const config = require('../config');
const fs = require('fs');
const sharepoint = require('../sharepoint');
const utility = require('../utility');

module.exports = {
  /**
   * Migration history
   * @type {Object}
   */
  history: {},

  /**
   * Get current migration status
   * @return {Promise}
   */
  run() {
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

    // Promise
    const p = new Promise((resolve) => {
      // Get migration status
      sharepoint.request.get({
        onError: () => {
          utility.log.success('success.done');
          utility.log.warning('status.uninstalled');
          utility.error.fail();
        },
        onStart: () => {
          utility.log.info('status.get');
        },
        onSuccess: () => {
          utility.log.success('success.done');
        },
        uri: `_api/web/lists/getbytitle('${config.sharepoint.lists.migrations}')/items`,
      }).then((response) => {
        // Save migration history
        response.d.results.forEach((item) => {
          this.history[item.Title] = {
            id: item.Id,
            title: item.Title,
            migrated: item.Migrated,
          };
        });

        // Queue migrations
        files.forEach((file) => {
          // Get migration name
          const name = `${file.replace(/\.js$/i, '')}`;
          utility.log.info('status.migration', { migration: name });

          // Not already migrated?
          if (!this.history[name] || !this.history[name].migrated) utility.log.warning('status.pending');
          else utility.log.success('status.migrated');
        });

        resolve();
      });
    });
    return p;
  },
};
