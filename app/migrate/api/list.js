const _ = require('lodash');
const bus = require('../bus');
const ContentTypes = require('./content-types');
const Fields = require('./fields');
const Task = require('../task');

/**
 * List
 * @type {List}
 */
class List {
  /**
   * Constructor
   * @param {Object} params
   * @return {List}
   */
  constructor(params = {}) {
    // Properties
    _.merge(this, {
      $parent: null,
      contentTypes: new ContentTypes({ $parent: this }),
      fields: new Fields({ $parent: this }),
      Id: null,
      Title: null,
    }, params);

    return this;
  }

  /**
   * Get list by ID or title
   * @return {pnp.List}
   */
  get() {
    if (this.Id) return this.$parent.get().getById(this.Id);
    return this.$parent.get().getByTitle(this.Title);
  }

  /**
   * Update list
   * @param {Object} params
   * @return {void}
   */
  update(params = {}) {
    // Options
    const options = _.merge({}, params);

    // Update content type
    bus.load(new Task((resolve) => {
      this.get().update(options).then(resolve);
    }));
  }

  /**
   * Delete list
   * @return {void}
   */
  delete() {
    bus.load(new Task((resolve) => {
      this.get().delete().then(resolve);
    }));
  }
}

module.exports = List;
