const bus = require('./bus');
const pnp = require('sp-pnp-js');
const Task = require('./task');

class Builder {
  /**
   * New builder
   * @param {Event} migrate
   * @return {Builder}
   */
  constructor(migrate) {
    /**
     * List of tasks for this migration segment
     * @type {Array}
     */
    this.tasks = [];

    // Process migration tasks
    migrate(this);

    // Add tasks from task bus
    this.tasks = bus.stop();

    return this;
  }

  /**
   * Load task
   * @param {Event} e
   * @return {void}
   */
  task(e) {
    const task = new Task((resolve) => {
      e(pnp).then(resolve);
    });
    bus.load(task);
  }
}

module.exports = Builder;
