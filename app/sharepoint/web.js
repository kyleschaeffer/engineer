const _ = require('lodash');
const config = require('../config');
const pnp = require('sp-pnp-js');

/**
 * Return sp-pnp-js web
 */
const Web = {
  /**
   * Root web object
   * @type {Object}
   */
  root: null,

  /**
   * Get web
   * @param  {String} relativePath
   * @return {Object}
   */
  get(relativePath = null) {
    if (relativePath) return new pnp.Web(`${config.site}/${_.trim(relativePath, '/')}`);
    if (!Web.web) Web.root = new pnp.Web(config.site);
    return Web.root;
  },
};

module.exports = Web;
