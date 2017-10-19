const _ = require('lodash');
const bus = require('../bus');
const Task = require('../task');

/**
 * View field collection
 * @type {ViewFields}
 */
class ViewFields {
  /**
   * Constructor
   * @param {Object} params
   * @return {ViewFields}
   */
  constructor(params = {}) {
    // Properties
    _.merge(this, {
      $parent: null,
    }, params);

    return this;
  }

  /**
   * Get view fields
   * @return {pnp.ViewFields}
   */
  get() {
    return this.$parent.get().fields;
  }

  /**
   * Add field to view
   * @param {string} fieldName
   * @return {void}
   */
  add(fieldName) {
    bus.load(new Task((resolve) => {
      this.get().add(fieldName).then(resolve);
    }));
  }

  /**
   * Remove field from view
   * @param {string} fieldName
   * @return {void}
   */
  remove(fieldName) {
    bus.load(new Task((resolve) => {
      this.get().remove(fieldName).then(resolve);
    }));
  }

  /**
   * Remove all fields from view
   * @return {void}
   */
  removeAll() {
    bus.load(new Task((resolve) => {
      this.get().removeAll().then(resolve);
    }));
  }

  /**
   * Move field in view
   * @param {string} fieldName
   * @param {number} index
   * @return {void}
   */
  move(fieldName, index) {
    bus.load(new Task((resolve) => {
      this.get().move(fieldName, index).then(resolve);
    }));
  }
}

module.exports = ViewFields;
