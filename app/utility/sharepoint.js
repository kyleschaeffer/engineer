const config = require('../config');
const csom = require('csom-node');
const log = require('./log');
const NodeFetchClient = require('node-pnp-js').default;
const pnp = require('sp-pnp-js');
const uuid = require('uuid/v4');

const SharePoint = {
  /**
   * Generate globally unique identifier (GUID)
   * @return {string}
   */
  guid() {
    return uuid();
  },

  /**
   * Configure SharePoint requests and authentication
   * @return {Promise}
   */
  setup() {
    return new Promise((resolve) => {
      SharePoint.configurePnp();
      SharePoint.configureCsom().then(resolve);
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
      // Configure CSOM authentication
      csom.setLoaderOptions({
        url: url || config.env.site,
      });
      const auth = new csom.AuthenticationContext(config.env.site);

      // Set auth cookie
      const authSave = (err, data) => {
        csom.ctx = new SP.ClientContext(config.env.site);
        auth.setAuthenticationCookie(csom.ctx);
        csom.web = csom.ctx.get_web();
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
        log.warning('auth.csom');
        resolve();
      }
    });
  },
};

module.exports = SharePoint;
