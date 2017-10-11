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
   * Roll back to this file name
   * @type {String}
   */
  rollbackTo: null,

  /**
   * Stop!
   * @type {Boolean}
   */
  stop: false,

  /**
   * Run pending rollbacks
   * @param  {String}  to
   * @return {Promise}
   */
  run(to) {
    // Promise
    const p = new Promise((resolve) => {
      // Get migration files
      const files = utility.file.readDir('migrations');

      // No migrations
      if (!files || !files.length) {
        utility.log.warning('rollback.empty');
        utility.error.fail();
      }

      // Roll back to
      if (to) {
        this.rollbackTo = utility.file.name(to, false);
        if (to && !utility.file.exists(`migrations/${this.rollbackTo}.js`)) utility.error.fail('migrate.exist', { file: this.rollbackTo });
      }

      // Get migration status
      status.get().then(() => {
        // Not installed
        if (!status.installed) {
          utility.log.warning('status.uninstalled');
          utility.error.fail();
        }

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
      if (!this.queue.length || this.stop) resolve();

      // Run next rollback
      else {
        const migration = this.queue.pop();

        // Roll back to
        if (this.rollbackTo && this.rollbackTo === migration.name) {
          this.stop = true;
          resolve();
        }

        else {
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
      }
    });
    return p;
  },
};
