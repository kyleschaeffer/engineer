/**
 * Builder API endpoints load tasks into the bus before adding them to a
 * migration
 * @type {Object}
 */
module.exports = {
  /**
   * Tasks on the bus
   * @type {Array}
   */
  tasks: [],

  /**
   * Get on the bus
   * @param  {Task} task
   * @return {Array}
   */
  load(task) {
    this.tasks.push(task);
    return this.tasks;
  },

  /**
   * Stop the bus!
   * @return {Array}
   */
  stop() {
    const tasks = this.tasks.slice(0, this.tasks.length);
    this.tasks = [];
    return tasks;
  },
};
