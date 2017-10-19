const _ = require('lodash');
const bus = require('./bus');
const csom = require('csom-node');
const fs = require('fs');
const pnp = require('sp-pnp-js');
const Task = require('./task');
const Web = require('./api/web');

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

    // Load the builder API
    this.api();

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
      e(pnp, csom).then(resolve);
    });
    bus.load(task);
  }

  /**
   * Load API into Builder
   * @return {Builder}
   */
  api() {
    fs.readdirSync(`${__dirname}/api`).forEach((file) => {
      if (file === 'index.js') return;
      const Endpoint = require(`./api/${file}`);
      this[_.camelCase(file.replace('.js', ''))] = new Endpoint();
    });
    return this;
  }

  /**
   * Get web relative to site
   * @param {string} Url
   * @return {Web}
   */
  web(Url = '/') {
    return new Web({ Url });
  }
}

module.exports = Builder;
