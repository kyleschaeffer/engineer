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
   * Migrate to this file name
   * @type {String}
   */
  migrateTo: null,

  /**
   * Stop!
   * @type {Boolean}
   */
  stop: false,

  /**
   * Run pending migrations
   * @param  {String}  to
   * @return {Promise}
   */
  run(to) {
    const p = new Promise((resolve) => {
      // Get migration files
      const files = utility.file.readDir('migrations');

      // No migrations
      if (!files || !files.length) {
        utility.log.warning('migrate.empty');
        utility.error.fail();
      }

      // Migrate to
      if (to) {
        this.migrateTo = utility.file.name(to, false);
        if (to && !utility.file.exists(`migrations/${this.migrateTo}.js`)) utility.error.fail('migrate.exist', { file: this.migrateTo });
      }

      // Get migration status
      status.get().then(() => {
        // Not installed
        if (!status.installed) {
          utility.log.warning('status.uninstalled');
          utility.error.fail();
        }

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
      if (!this.queue.length || this.stop) resolve();

      // Run next migration
      else {
        const migration = this.queue.shift();
        utility.log.info('migrate.begin', { name: migration.name });
        migration.migration.run().then(() => {
          // Update migration status
          status.update(migration.name, true).then(() => {
            // Migrate to
            if (this.migrateTo && this.migrateTo === migration.name) {
              this.stop = true;
              resolve();
            }

            // Next
            else {
              this.next().then(() => {
                resolve();
              });
            }
          });
        });
      }
    });
    return p;
  },
};
