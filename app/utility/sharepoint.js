const config = require('../config');
const csom = require('csom-node');
const log = require('./log');
const NodeFetchClient = require('node-pnp-js').default;
const pnp = require('sp-pnp-js');

const SharePoint = {
  /**
   * Configure SharePoint requests and authentication
   * @return {Promise}
   */
  setup() {
    return new Promise((resolve) => {
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

      // Configure CSOM authentication
      csom.setLoaderOptions({
        url: config.env.site,
      });
      const auth = new csom.AuthenticationContext(config.env.site);
      auth.acquireTokenForUser('kyle@oldrivercreative.com', 'Mobyt0bs', (err, data) => {
        // Save authentication token
        csom.ctx = new SP.ClientContext(config.env.site);
        auth.setAuthenticationCookie(csom.ctx);
        csom.web = csom.ctx.get_web();

        resolve();
      });
    });
  },
};

module.exports = SharePoint;
