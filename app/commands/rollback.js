const fs = require('fs');
const Migration = require('../migrate/migration');
const status = require('../migrate/status');
const utility = require('../utility');

module.exports = {
  /**
   * Rollback queue
   * @type {Array}
   */
  queue: [],

  /**
   * Run pending rollbacks
   * @return {Promise}
   */
  run() {
    // Promise
    const p = new Promise((resolve) => {
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

      // Get migration status
      status.get().then(() => {
        // Queue rollbacks
        files.forEach((file) => {
          // Get migration name
          const name = `${file.replace(/\.js$/i, '')}`;

          // Not already rolled back?
          if (status.history[name] && status.history[name].migrated) {
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
          status.update(migration.name, false).then(() => {
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
