const _ = require('lodash');
const bus = require('../bus');
const Task = require('../task');
const View = require('./view');

/**
 * View collection
 * @type {Views}
 */
class Views {
  /**
   * Constructor
   * @param {Object} params
   * @return {Views}
   */
  constructor(params = {}) {
    // Properties
    _.merge(this, {
      $parent: null,
    }, params);

    return this;
  }

  /**
   * Get views
   * @return {pnp.Views}
   */
  get() {
    return this.$parent.get().views;
  }

  /**
   * Get view by ID
   * @param {string} Id
   * @return {View}
   */
  getById(Id) {
    return new View({ $parent: this, Id });
  }

  /**
   * Get view by title
   * @param {string} Title
   * @return {View}
   */
  getByTitle(Title) {
    return new View({ $parent: this, Title });
  }

  /**
   * Add view
   * @param {Object} params
   * @return {void}
   */
  add(params = {}) {
    // Options
    const options = _.merge({
      Title: null,
      PersonalView: false,
    }, typeof params === 'object' ? params : { Title: params });

    // Add view
    bus.load(new Task((resolve) => {
      this.get().add(options.Title, options.PersonalView, options).then(resolve);
    }));
  }
}

module.exports = Views;
