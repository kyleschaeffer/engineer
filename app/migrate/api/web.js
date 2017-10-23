const _ = require('lodash');
const bus = require('../bus');
const ContentTypes = require('./content-types');
const Fields = require('./fields');
const Lists = require('./lists');
const pnp = require('sp-pnp-js');
const Task = require('../task');
const utility = require('../../utility');
const Webs = require('./webs');

/**
 * Web
 * @type {Web}
 */
class Web {
  /**
   * Constructor
   * @param {Object} params
   * @return {Web}
   */
  constructor(params = {}) {
    // Properties
    _.merge(this, {
      contentTypes: new ContentTypes({ $parent: this }),
      fields: new Fields({ $parent: this }),
      lists: new Lists({ $parent: this }),
      webs: new Webs({ $parent: this }),
      Url: '/',
      Web: null,
    }, params);

    return this;
  }

  /**
   * Get web
   * @return {pnp.Web}
   */
  get() {
    if (!this.Web) this.Web = new pnp.Web(this.Url);
    return this.Web;
  }

  /**
   * Update web
   * @param {Object} params
   * @return {void}
   */
  update(params = {}) {
    // Options
    const options = _.merge({}, params);

    // Update web
    bus.load(new Task((resolve) => {
      utility.log.info({
        level: 2,
        key: 'web.update',
        tokens: { web: this.Url },
      });
      this.get().update(options).then(resolve).catch(resolve);
    }));
  }

  /**
   * Delete web
   * @return {void}
   */
  delete() {
    bus.load(new Task((resolve) => {
      utility.log.info({
        level: 2,
        key: 'web.delete',
        tokens: { web: this.Url },
      });
      this.get().delete().then(resolve).catch(resolve);
    }));
  }
}

module.exports = Web;
