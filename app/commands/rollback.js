const config = require('../config');
const fs = require('fs');
const Migration = require('../migrate/migration');
const sharepoint = require('../sharepoint');
const utility = require('../utility');

module.exports = {
  /**
   * Rollback queue
   * @type {Array}
   */
  queue: [],

  /**
   * Migration history
   * @type {Object}
   */
  history: {},

  /**
   * Run pending rollbacks
   * @return {Promise}
   */
  run() {
    // No migrations (folder doesn't exist)
    if (!utility.file.exists('migrations')) {
      utility.log.warning('rollback.empty');
      utility.error.fail();
    }

    // Get migration files
    const files = fs.readdirSync(utility.file.path('migrations'));

    // No migrations
    if (!files.length) {
      utility.log.warning('rollback.empty');
      utility.error.fail();
    }

    // Promise
    const p = new Promise((resolve) => {
      // Get migration status
      sharepoint.request.get({
        onError: (response) => {
          utility.log.error('error.failed');
          utility.error.handle(response);
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

        // Queue rollbacks
        files.forEach((file) => {
          // Get migration name
          const name = `${file.replace(/\.js$/i, '')}`;

          // Not already rolled back?
          if (this.history[name] && this.history[name].migrated) {
            // Load migration file
            const data = require(`${process.cwd()}/migrations/${file}`);
            const migration = new Migration(data);

            // Add to queue
            this.queue.push({
              name,
              migration,
            });
          }
        });

        // Nothing to roll back
        if (!this.queue.length) {
          utility.log.warning('rollback.upToDate');
          utility.error.fail();
        }

        // Run rollbacks
        this.next().then(() => {
          utility.log.success('rollback.complete');
          resolve();
        });
      });
    });
    return p;
  },

  /**
   * Run next rollback in queue
   * @return {Promise}
   */
  next() {
    const p = new Promise((resolve) => {
      // No rollbacks in queue
      if (!this.queue.length) resolve();

      // Run next rollback
      else {
        const migration = this.queue.shift();
        utility.log.info('rollback.begin', { name: migration.name });
        migration.migration.run(true).then(() => {
          // Update migration status
          sharepoint.request.update({
            body: {
              __metadata: {
                type: `SP.Data.${config.sharepoint.lists.migrations}ListItem`,
              },
              Migrated: false,
            },
            onError: (response) => {
              utility.log.error('error.failed');
              utility.error.handle(response);
            },
            onStart: () => {
              utility.log.info('status.set', { migration: migration.name });
            },
            onSuccess: () => {
              utility.log.success('success.done');
            },
            uri: `_api/web/lists/getbytitle('${config.sharepoint.lists.migrations}')/items(${this.history[migration.name].id})`,
          }).then(() => {
            // Next
            this.next().then(() => {
              resolve();
            });
          });
        });
      }
    });
    return p;
  },
};
