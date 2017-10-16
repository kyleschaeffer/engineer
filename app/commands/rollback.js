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
   * @type {string}
   */
  rollbackTo: null,

  /**
   * Stop!
   * @type {boolean}
   */
  stop: false,

  /**
   * Run pending rollbacks
   * @param {Object} options
   * @return {void}
   */
  run(options) {
    // Get migration files
    let files = utility.file.readDir('migrations');

    // No migrations
    if (!files || !files.length) {
      utility.log.warning('rollback.empty');
      utility.error.fail();
    }

    // Roll back to
    if (options.to) {
      this.rollbackTo = utility.file.name(options.to, false);
      if (!utility.file.exists(`migrations/${this.rollbackTo}.js`)) utility.error.fail('migrate.exist', { file: this.rollbackTo });
    }

    // Only
    if (options.only) {
      const onlyFile = utility.file.name(options.only, false);
      if (!utility.file.exists(`migrations/${onlyFile}.js`)) utility.error.fail('migrate.exist', { file: onlyFile });
      files = [`${onlyFile}.js`];
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
        if (options.force || (status.history[name] && status.history[name].Migrated)) {
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
      });
    });
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
