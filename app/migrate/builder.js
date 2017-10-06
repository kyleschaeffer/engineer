const bus = require('./bus');
const fs = require('fs');

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

    // Load API and build
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
      this[file.replace(/(\.\/|\.js)/g, '')] = require(`./api/${file}`);
    });
    return this;
  }
}

module.exports = Builder;
