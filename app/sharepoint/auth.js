const env = require('../../env');
const spauth = require('node-sp-auth');
const utility = require('../utility');

module.exports = {
  /**
   * Authenticate to SharePoint
   * @return {Promise}
   */
  authenticate() {
    const p = new Promise((resolve, reject) => {
      utility.log.info(`Authenticating to ${env.site}...`);
      spauth.getAuth(env.site, env.auth).then((options) => {
        utility.log.success('done.\n');
        resolve(options);
      }).catch((response) => {
        const title = response.message.match(/<S:Text.*?>(.*)<\/S:Text>/)[1];
        const message = response.message.match(/<psf:text>(.*)<\/psf:text>/)[1];
        utility.log.error(`\n${title}: ${message}\n`);
        reject(response);
      });
    });
    return p;
  },
};
