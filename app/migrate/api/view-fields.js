const _ = require('lodash');
const bus = require('../bus');
const Task = require('../task');
const utility = require('../../utility');

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
      utility.log.info({
        level: 2,
        key: 'viewField.add',
        tokens: {
          fieldName,
          view: this.$parent.Title || this.$parent.Id,
          target: this.$parent.$parent.$parent.Title || this.$parent.$parent.$parent.Id,
        },
      });
      this.get().add(fieldName).then(resolve).catch(resolve);
    }));
  }

  /**
   * Remove field from view
   * @param {string} fieldName
   * @return {void}
   */
  remove(fieldName) {
    bus.load(new Task((resolve) => {
      utility.log.info({
        level: 2,
        key: 'viewField.remove',
        tokens: {
          fieldName,
          view: this.$parent.Title || this.$parent.Id,
          target: this.$parent.$parent.$parent.Title || this.$parent.$parent.$parent.Id,
        },
      });
      this.get().remove(fieldName).then(resolve).catch(resolve);
    }));
  }

  /**
   * Remove all fields from view
   * @return {void}
   */
  removeAll() {
    bus.load(new Task((resolve) => {
      utility.log.info({
        level: 2,
        key: 'viewField.removeAll',
        tokens: {
          view: this.$parent.Title || this.$parent.Id,
          target: this.$parent.$parent.$parent.Title || this.$parent.$parent.$parent.$parent.Id,
        },
      });
      this.get().removeAll().then(resolve).catch(resolve);
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
      utility.log.info({
        level: 2,
        key: 'viewField.move',
        tokens: {
          fieldName,
          view: this.$parent.Title || this.$parent.Id,
          target: this.$parent.$parent.$parent.Title || this.$parent.$parent.$parent.Id,
        },
      });
      this.get().move(fieldName, index).then(resolve).catch(resolve);
    }));
  }
}

module.exports = ViewFields;
