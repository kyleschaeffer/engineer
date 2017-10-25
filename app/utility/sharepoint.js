const _ = require('lodash');
const config = require('../config');
const csom = require('csom-node');
const log = require('./log');
const NodeFetchClient = require('node-pnp-js').default;
const pnp = require('sp-pnp-js');
const uuid = require('uuid/v4');

const SharePoint = {
  /**
   * Cached CSOM url
   * @type {string}
   */
  csomUrl: null,

  /**
   * Generate globally unique identifier (GUID)
   * @return {string}
   */
  guid() {
    return uuid();
  },

  /**
   * Generate pretty SharePoint URL
   * @param {string} url
   * @return {string}
   */
  url(url) {
    return _.trim(`${_.trim(config.env.site, '/')}/${_.trim(url, '/')}`, '/');
  },

  /**
   * Configure SharePoint requests and authentication
   * @return {Promise}
   */
  setup() {
    return new Promise((resolve) => {
      SharePoint.configurePnp();
      resolve();
      // SharePoint.configureCsom().then(resolve);
    });
  },

  /**
   * Configure Pnp authentication and logging
   * @return {void}
   */
  configurePnp() {
    // Configure PnP authentication
    pnp.setup({
      sp: {
        fetchClientFactory: () => new NodeFetchClient(config.env.auth),
        baseUrl: config.env.site,
      },
    });

    // Log listener
    const listener = new pnp.FunctionListener(log.listener);
    pnp.Logger.subscribe(listener);
    pnp.Logger.activeLogLevel = config.env.logLevel;
  },

  /**
   * Configure CSOM authentication
   * @param {string} url
   * @return {Promise}
   */
  configureCsom(url = null) {
    return new Promise((resolve) => {
      // Get web url
      const webUrl = url ? SharePoint.url(url) : config.env.site;

      // Already authenticated
      if (webUrl === SharePoint.csomUrl) resolve();

      // Configure CSOM authentication
      else {
        csom.setLoaderOptions({
          url: webUrl,
        });
        const auth = new csom.AuthenticationContext(config.env.site);

        // Set auth cookie
        const authSave = () => {
          csom.ctx = new SP.ClientContext(webUrl); // eslint-disable-line no-undef
          auth.setAuthenticationCookie(csom.ctx);
          csom.web = csom.ctx.get_web();
          SharePoint.csomUrl = webUrl;
          resolve();
        };

        // Authenticate
        if (config.env.auth.username && config.env.auth.password) {
          auth.acquireTokenForUser(config.env.auth.username, config.env.auth.password, authSave);
        }
        else if (config.env.auth.clientId && config.env.auth.clientSecret) {
          auth.acquireTokenForApp(config.env.auth.clientId, config.env.auth.clientSecret, authSave);
        }
        else {
          log.warning({ key: 'auth.csom' });
          resolve();
        }
      }
    });
  },

  /**
   * Get parent objects to help with CSOM targeting
   * @param {Object} start
   * @return {Object}
   */
  getParents(start) {
    // Parent objects
    const parents = {
      web: start,
      list: null,
    };

    // Iterate parents to find webs and lists
    while (parents.web.$parent) {
      parents.web = parents.web.$parent;
      if (parents.web.constructor.name === 'List') parents.list = parents.web;
      if (parents.web.constructor.name === 'Web') break;
    }

    return parents;
  },
};

module.exports = SharePoint;
