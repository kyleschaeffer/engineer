const config = require('../config');
const spauth = require('node-sp-auth');
const utility = require('../utility');

module.exports = {
  /**
   * Authenticate to SharePoint
   * @return {Promise}
   */
  authenticate() {
    const p = new Promise((resolve) => {
      utility.log.info(`Authenticating to ${config.env.site}...`);
      spauth.getAuth(config.env.site, config.env.auth).then((options) => {
        utility.log.success('done.\n');
        resolve(options);
      }).catch((response) => {
        const title = response.message.match(/<S:Text.*?>(.*)<\/S:Text>/)[1];
        const message = response.message.match(/<psf:text>(.*)<\/psf:text>/)[1];
        utility.log.error(`done.\n${title}: ${message}\n`);
        utility.error.fail();
      });
    });
    return p;
  },
};
