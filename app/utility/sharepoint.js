const config = require('../config');
const log = require('./log');
const NodeFetchClient = require('node-pnp-js').default;
const pnp = require('sp-pnp-js');

const SharePoint = {
  /**
   * Configure SharePoint requests and authentication
   * @return {void}
   */
  setup() {
    // Configure authentication
    pnp.setup({
      sp: {
        fetchClientFactory: () => new NodeFetchClient(config.env.auth),
        baseUrl: config.env.site,
      },
    });

    // Log listener
    const listener = new pnp.FunctionListener(log.listener);
    pnp.Logger.subscribe(listener);
    pnp.Logger.activeLogLevel = 1;
  },
};

module.exports = SharePoint;
