const _ = require('lodash');
const bus = require('../bus');
const Task = require('../task');
const utility = require('../../utility');
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
      utility.log.info('view.update', { view: this.Title || this.Id });
      this.get().update(options).then(resolve).catch(resolve);
    }));
  }

  /**
   * Delete view
   * @return {void}
   */
  delete() {
    bus.load(new Task((resolve) => {
      utility.log.info('view.delete', { view: this.Title || this.Id });
      this.get().delete().then(resolve).catch(resolve);
    }));
  }
}

module.exports = View;
