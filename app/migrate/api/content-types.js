const _ = require('lodash');
const bus = require('../bus');
const ContentType = require('./content-type');
const manifest = require('../manifest');
const Task = require('../task');
const utility = require('../../utility');

/**
 * Content type collection
 * @type {ContentTypes}
 */
class ContentTypes {
  /**
   * Constructor
   * @return {ContentTypes}
   */
  constructor(params = {}) {
    // Properties
    _.merge(this, {
      $parent: null,
    }, params);

    return this;
  }

  /**
   * Get content types
   * @return {pnp.ContentTypes}
   */
  get() {
    return this.$parent.get().contentTypes;
  }

  /**
   * Get content type by ID
   * @param {string} Id
   * @return {ContentType}
   */
  getById(Id) {
    return new ContentType({ $parent: this, Id });
  }

  /**
   * Get content type by name
   * @param {string} Name
   * @return {ContentType}
   */
  getByName(Name) {
    return new ContentType({ $parent: this, Name });
  }

  /**
   * Add new content type
   * @param {Object} params
   * @return {void}
   */
  add(params = {}) {
    // Options
    const options = _.merge({
      ParentContentTypeId: '0x01',
      Id: _.upperCase(utility.sharepoint.guid().replace('-', '')),
      Name: null,
      Description: '',
      Group: undefined,
    }, typeof params === 'object' ? params : { Name: params });

    // Add content type
    bus.load(new Task((resolve) => {
      this.get().add(`${options.ParentContentTypeId}00${options.Id}`, options.Name, options.Description, options.Group).then(manifest.process).then(resolve);
    }));
  }
}

module.exports = ContentTypes;
