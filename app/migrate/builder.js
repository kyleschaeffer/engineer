const bus = require('./bus');
const manifest = require('./manifest');
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

  /**
   * Save content type data to manifest
   * @param {Object} response
   * @return {Promise}
   */
  saveContentType(response) {
    const p = new Promise((resolve) => {
      if (!response || !response.data || !response.data.Name || !response.data.StringId) resolve();
      else manifest.save(response.data.Name, response.data.StringId).then(resolve);
    });
    return p;
  }

  /**
   * Get content type ID from manifest
   * @param {string} name
   * @return {string}
   */
  getContentType(name) {
    const contentType = manifest.data[name];
    if (contentType) return contentType.Value;
    return '';
  }
}

module.exports = Builder;
