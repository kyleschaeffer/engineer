const _ = require('lodash');
const bus = require('../bus');
const List = require('./list');
const Task = require('../task');
const utility = require('../../utility');

/**
 * List collection
 * @type {Lists}
 */
class Lists {
  /**
   * Constructor
   * @param {Object} params
   * @return {Lists}
   */
  constructor(params = {}) {
    // Properties
    _.merge(this, {
      $parent: null,
    }, params);

    return this;
  }

  /**
   * Get lists
   * @return {pnp.Lists}
   */
  get() {
    return this.$parent.get().lists;
  }

  /**
   * Get list by ID
   * @param {string} Id
   * @return {List}
   */
  getById(Id) {
    return new List({ $parent: this, Id });
  }

  /**
   * Get list by title
   * @param {string} Title
   * @return {List}
   */
  getByTitle(Title) {
    return new List({ $parent: this, Title });
  }

  /**
   * Get list by name (getByTitle)
   * @param {string} Name
   * @return {List}
   */
  getByName(Name) {
    return this.getByTitle(Name);
  }

  /**
   * Add list
   * @param {Object} params
   * @return {void}
   */
  add(params = {}) {
    // Options
    const options = _.merge({
      BaseTemplate: 100,
      ContentTypesEnabled: false,
      Description: '',
      Title: null,
    }, typeof params === 'object' ? params : { Title: params });

    // Add list
    bus.load(new Task((resolve) => {
      utility.log.info({
        level: 2,
        key: 'list.add',
        tokens: {
          list: options.Title,
          target: utility.sharepoint.url(this.$parent.Url),
        },
      });
      this.get().add(options.Title, options.Description, options.BaseTemplate, options.ContentTypesEnabled, options).then(resolve).catch(resolve);
    }));
  }
}

module.exports = Lists;
