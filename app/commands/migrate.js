const Migration = require('../migrate/migration');
const status = require('../migrate/status');
const utility = require('../utility');

module.exports = {
  /**
   * Migration queue
   * @type {Array}
   */
  queue: [],

  /**
   * Run pending migrations
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
        // Queue migrations
        files.forEach((file) => {
          // Get migration name
          const name = `${file.replace(/\.js$/i, '')}`;

          // Not already migrated?
          if (!status.history[name] || !status.history[name].migrated) {
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
          status.update(migration.name, true).then(() => {
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
