const _ = require('lodash');
const bus = require('./bus');
const fs = require('fs');
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
  getWeb(Url = '/') {
    return new Web({ Url });
  }
}

module.exports = Builder;
