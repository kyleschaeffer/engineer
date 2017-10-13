const bus = require('./bus');
const sharepoint = require('../sharepoint');
const Task = require('./task');
const utility = require('../utility');

class Builder {
  /**
   * New builder
   * @param  {Event} migrate
   * @return {Builder}
   */
  constructor(migrate) {
    /**
     * List of tasks for this migration segment
     * @type {Array}
     */
    this.tasks = [];

    // Process migration tasks
    migrate(this, sharepoint.web.get());

    // Add tasks from task bus
    this.tasks = bus.stop();

    return this;
  }

  /**
   * Load task
   * @param  {Event} e
   * @return {void}
   */
  task(e) {
    const task = new Task((resolve) => {
      e().then(() => {
        resolve();
      }).catch(utility.error.handle);
    });
    bus.load(task);
  }
}

module.exports = Builder;
