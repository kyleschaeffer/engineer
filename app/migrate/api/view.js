const _ = require('lodash');
const bus = require('../bus');
const Task = require('../task');
const ViewFields = require('./view-fields');

/**
 * View
 * @type {View}
 */
class View {
  /**
   * Constructor
   * @param {Object} params
   * @return {View}
   */
  constructor(params = {}) {
    // Properties
    _.merge(this, {
      $parent: null,
      viewFields: new ViewFields({ $parent: this }),
      Id: null,
      Title: null,
    }, params);

    return this;
  }

  /**
   * Get view by ID or title
   * @return {pnp.View}
   */
  get() {
    if (this.Id) return this.$parent.get().getById(this.Id);
    return this.$parent.get().getByTitle(this.Title);
  }

  /**
   * Update view
   * @param {Object} params
   * @return {void}
   */
  update(params = {}) {
    // Options
    const options = _.merge({}, params);

    // Update view
    bus.load(new Task((resolve) => {
      this.get().update(options).then(resolve);
    }));
  }

  /**
   * Delete view
   * @return {void}
   */
  delete() {
    bus.load(new Task((resolve) => {
      this.get().delete().then(resolve);
    }));
  }
}

module.exports = View;
