const _ = require('lodash');
const bus = require('../bus');
const Task = require('../task');
const utility = require('../../utility');

/**
 * Web collection
 * @type {Webs}
 */
class Webs {
  /**
   * Constructor
   * @param {Object} params
   * @return {Webs}
   */
  constructor(params = {}) {
    // Properties
    _.merge(this, {
      $parent: null,
    }, params);

    return this;
  }

  /**
   * Get webs
   * @return {pnp.Webs}
   */
  get() {
    return this.$parent.get().webs;
  }

  /**
   * Add web
   * @param {Object} params
   * @return {void}
   */
  add(params = {}) {
    // Options
    const options = _.merge({
      Description: '',
      Language: 1033,
      Title: null,
      Url: typeof params === 'object' && params.Title && !params.Url ? _.kebabCase(params.Title) : '',
      UseSamePermissionsAsParentSite: true,
      WebTemplate: 'STS',
    }, typeof params === 'object' ? params : { Title: params, Url: _.kebabCase(params) });

    // Add web
    bus.load(new Task((resolve) => {
      utility.log.info({
        level: 2,
        key: 'web.add',
        tokens: { web: options.Url },
      });
      this.get().add(options.Title, options.Url, options.Description, options.WebTemplate, options.Language, options.UseSamePermissionsAsParentSite, options).then(resolve).catch(resolve);
    }));
  }
}

module.exports = Webs;
