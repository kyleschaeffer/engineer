const fs = require('fs');
const Migration = require('../migrate/migration');
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
    // No migrations (folder doesn't exist)
    if (!utility.file.exists('migrations')) {
      utility.log.warning('Nothing to migrate. Use "engineer make <name>" to create a new migration.\n');
      utility.error.fail();
    }

    // Get migration files
    const files = fs.readdirSync(utility.file.path('migrations'));

    // No migrations
    if (!files.length) {
      utility.log.warning('Nothing to migrate. Use "engineer make <name>" to create a new migration.\n');
      utility.error.fail();
    }

    // Queue migrations
    files.forEach((file) => {
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

    // Run migrations
    const p = new Promise((resolve) => {
      this.next().then(() => {
        utility.log.success('Migration complete.\n');
        resolve();
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
        utility.log.info('Migrating ');
        utility.log.important(`${migration.name}`);
        utility.log.info('...\n');
        migration.migration.run().then(() => {
          this.next().then(() => {
            resolve();
          });
        });
      }
    });
    return p;
  },
};
