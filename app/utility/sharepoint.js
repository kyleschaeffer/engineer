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
    pnp.setup({
      sp: {
        fetchClientFactory: () => new NodeFetchClient(config.env.auth),
        baseUrl: config.env.site,
      },
      log: log.dump,
    });
  },
};

module.exports = SharePoint;
