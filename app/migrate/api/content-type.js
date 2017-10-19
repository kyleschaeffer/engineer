const _ = require('lodash');
const bus = require('../bus');
const FieldLinks = require('./field-links');
const manifest = require('../manifest');
const Task = require('../task');

/**
 * Content type
 * @type {ContentType}
 */
class ContentType {
  /**
   * Constructor
   * @param {Object} params
   * @return {ContentType}
   */
  constructor(params = {}) {
    // Properties
    _.merge(this, {
      $parent: null,
      Id: null,
      Name: null,
      fieldLinks: new FieldLinks({ $parent: this }),
    }, params);

    return this;
  }

  /**
   * Get most up-to-date content type ID from manifest
   * @return {string}
   */
  id() {
    return this.Name && manifest.data[this.Name] ? manifest.data[this.Name].Value : this.Id;
  }

  /**
   * Get content type
   * @return {pnp.ContentType}
   */
  get() {
    return this.$parent.get().getById(this.id());
  }

  /**
   * Update content type
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
   * Delete content type
   * @return {void}
   */
  delete() {
    bus.load(new Task((resolve) => {
      this.get().delete().then(resolve);
    }));
  }
}

module.exports = ContentType;
