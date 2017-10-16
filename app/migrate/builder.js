const bus = require('./bus');
const config = require('../config');
const pnp = require('sp-pnp-js');
const Task = require('./task');
const utility = require('../utility');

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
      e(pnp).then(resolve).catch(utility.error.handle);
    });
    bus.load(task);
  }

  /**
   * Get SharePoint field type name
   * @param {string} fieldType
   * @return {string}
   */
  type(fieldType) {
    if (config.sharepoint.fieldTypeExceptions[fieldType]) return `SP.${config.sharepoint.fieldTypeExceptions[fieldType]}`;
    return `SP.${fieldType}Field`;
  }

  /**
   * Get SharePoint field type kind
   * @param {string} fieldType
   * @return {number}
   */
  typeKind(fieldType) {
    if (config.sharepoint.fields[fieldType]) return config.sharepoint.fields[fieldType];
    return 2;
  }
}

module.exports = Builder;
