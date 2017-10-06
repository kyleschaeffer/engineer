const fs = require('fs');
const Migration = require('../migrate/migration');
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
    // No migrations (folder doesn't exist)
    if (!utility.file.exists('migrations')) {
      utility.log.warning('Nothing to roll back.\n');
      utility.error.fail();
    }

    // Get migration files
    const files = fs.readdirSync(utility.file.path('migrations'));

    // No migrations
    if (!files.length) {
      utility.log.warning('Nothing to roll back.\n');
      utility.error.fail();
    }

    // Queue migrations
    files.reverse().forEach((file) => {
      // Get migration name
      const name = `${file.replace(/\.js$/i, '')}`;

      // Load migration file
      const data = require(`${process.cwd()}/migrations/${file}`);
      const migration = new Migration(data);

      // Add to queue
      this.queue.push({
        name,
        migration,
      });
    });

    // Run rollbacks
    const p = new Promise((resolve) => {
      this.next().then(() => {
        utility.log.success('Rollback complete.\n');
        resolve();
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
        utility.log.info('Rolling back ');
        utility.log.important(`${migration.name}`);
        utility.log.info('...\n');
        migration.migration.run(true).then(() => {
          this.next().then(() => {
            resolve();
          });
        });
      }
    });
    return p;
  },
};
