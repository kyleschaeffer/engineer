const Builder = require('./builder');

class Migration {
  /**
   * Initialize the migration using a migration object
   * @param  {Object} migration
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
    };

    // Build from migration object
    this.build(migration);

    return this;
  }

  /**
   * Process migration and add to the task queues
   * @param  {Object} migration
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
   * @param  {Boolean} rollback
   * @return {Promise}
   */
  run(rollback = false) {
    const p = new Promise((resolve) => {
      this.next(rollback).then(() => {
        resolve();
      });
    });
    return p;
  }

  /**
   * Run next task in queue and continue to run
   * @param  {Boolean}  rollback
   * @return {Promise}
   */
  next(rollback = false) {
    const p = new Promise((resolve) => {
      // Get task queue
      const dir = !rollback ? 'up' : 'down';

      // No tasks in queue
      if (!this.queue[dir].length) resolve();

      // Run next task
      else {
        const task = this.queue[dir].shift();
        task.run().then(() => {
          this.next(rollback);
        });
      }
    });
    return p;
  }
}

module.exports = Migration;
