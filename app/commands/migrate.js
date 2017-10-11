const config = require('../config');
const fs = require('fs');
const Migration = require('../migrate/migration');
const sharepoint = require('../sharepoint');
const utility = require('../utility');

module.exports = {
  /**
   * Migration queue
   * @type {Array}
   */
  queue: [],

  /**
   * Migration history
   * @type {Object}
   */
  history: {},

  /**
   * Run pending migrations
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

        // Queue migrations
        files.forEach((file) => {
          // Get migration name
          const name = `${file.replace(/\.js$/i, '')}`;

          // Not already migrated?
          if (!this.history[name] || !this.history[name].migrated) {
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

        // Nothing to migrate
        if (!this.queue.length) {
          utility.log.warning('migrate.upToDate');
          utility.error.fail();
        }

        // Run migrations
        this.next().then(() => {
          utility.log.success('migrate.complete');
          resolve();
        });
      });
    });
    return p;
  },

  /**
   * Run next migration in queue
   * @return {Promise}
   */
  next() {
    const p = new Promise((resolve) => {
      // No migrations in queue
      if (!this.queue.length) resolve();

      // Run next migration
      else {
        const migration = this.queue.shift();
        utility.log.info('migrate.begin', { name: migration.name });
        migration.migration.run().then(() => {
          // Update migration status
          if (this.history[migration.name]) {
            sharepoint.request.update({
              body: {
                __metadata: {
                  type: `SP.Data.${config.sharepoint.lists.migrations}ListItem`,
                },
                Migrated: true,
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
          }

          // Save new migration status
          else {
            sharepoint.request.post({
              body: {
                __metadata: {
                  type: `SP.Data.${config.sharepoint.lists.migrations}ListItem`,
                },
                Title: migration.name,
                Migrated: true,
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
              uri: `_api/web/lists/getbytitle('${config.sharepoint.lists.migrations}')/items`,
            }).then(() => {
              // Next
              this.next().then(() => {
                resolve();
              });
            });
          }
        });
      }
    });
    return p;
  },
};
