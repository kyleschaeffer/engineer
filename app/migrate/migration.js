const Builder = require('./builder');
const utility = require('../utility');

class Migration {
  /**
   * Initialize the migration using a migration object
   * @param {Object} migration
   * @return {Migration}
   */
  constructor(migration) {
    /**
     * Task queue
     * @type {Array}
     */
    this.queue = {
      up: [],
      down: [],
      total: 0,
      migrated: 0,
    };

    // Build from migration object
    this.build(migration);

    return this;
  }

  /**
   * Process migration and add to the task queues
   * @param {Object} migration
   * @return {Migration}
   */
  build(migration) {
    // Process migration
    if (migration.up) {
      const up = new Builder(migration.up);
      this.queue.up = this.queue.up.concat(up.tasks);
    }
    if (migration.down) {
      const down = new Builder(migration.down);
      this.queue.down = this.queue.down.concat(down.tasks);
    }

    return this;
  }

  /**
   * Run migration tasks
   * @param {boolean} rollback
   * @return {Promise}
   */
  run(rollback = false) {
    // Count migrations
    this.queue.total = this.queue[!rollback ? 'up' : 'down'].length;

    // Begin queue
    return new Promise((resolve) => {
      this.next(rollback).then(resolve);
    });
  }

  /**
   * Run next task in queue and continue to run
   * @param {boolean} rollback
   * @return {Promise}
   */
  next(rollback = false) {
    return new Promise((resolve) => {
      // Get task queue
      const dir = !rollback ? 'up' : 'down';

      // No tasks in queue
      if (!this.queue[dir].length) resolve();

      // Run next task
      else {
        const task = this.queue[dir].shift();
        utility.log.info('migrate.count', { current: this.queue.migrated + 1, total: this.queue.total });
        utility.log.indent();
        task.run().then(() => {
          utility.log.outdent();
          this.queue.migrated += 1;
          this.next(rollback).then(resolve);
        });
      }
    });
  }
}

module.exports = Migration;
