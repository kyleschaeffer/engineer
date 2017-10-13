const config = require('../config');
const pnpn = require('sp-pnp-node');
const utility = require('../utility');

const Auth = {
  /**
   * Authenticated?
   * @type {Boolean}
   */
  authenticated: false,

  /**
   * Authenticate to SharePoint
   * @return {[type]}
   */
  authenticate() {
    const p = new Promise((resolve) => {
      // Already authenticated?
      if (Auth.authenticated) resolve();

      // Authenticate
      else {
        utility.log.info('auth.begin', { site: config.site });

        // Init PnpNode with config
        const connection = new pnpn.PnpNode({
          siteUrl: config.site,
          authOptions: config.auth,
        });

        // Authenticate
        connection.init().then(() => {
          Auth.authenticated = true;
          utility.log.success('success.done');
          resolve();
        }).catch(utility.error.handle);
      }
    });
    return p;
  },
};

module.exports = Auth;
