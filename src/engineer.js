const env = require('../env');
const log = require('./log');
const request = require('request-promise');
const spauth = require('node-sp-auth');

const Engineer = {
  /**
   * Authenticate to SharePoint
   * @return {Promise}
   */
  authenticate() {
    log.important(`Authenticating to ${env.site}...`);
    const authPromise = new Promise((resolve) => {
      spauth.getAuth(env.site, env).then((options) => {
        log.success('Authenticated.');
        const { headers } = options;
        headers.Accept = 'application/json;odata=verbose';
        resolve(headers);
      }).catch((response) => {
        const title = response.message.match(/<S:Text.*?>(.*)<\/S:Text>/)[1];
        const message = response.message.match(/<psf:text>(.*)<\/psf:text>/)[1];
        log.error(`${title}: ${message}`);
      });
    });
    return authPromise;
  },

  /**
   * Handle SharePoint error response
   * @param {Object} response
   * @type {void}
   */
  handle(response) {
    let message = 'Unknown error.';

    // Detailed SharePoint error message
    if (response.error && response.error.length) {
      const json = JSON.parse(response.error);
      if (json.error && json.error.message && json.error.message.value) message = json.error.message.value;
    }

    // Generic status message
    else if (response.response && response.response.statusMessage && response.response.statusMessage.length) message = `${response.response.statusMessage}`;

    // Log
    log.error(`Error (${response.statusCode}): ${message}`);
  },

  /**
   * Get data from endpoint URL
   * @param  {String} url
   * @return {Promise}
   */
  get(url) {
    const endpoint = url.replace(/^\/|\/$/g, '');
    const get = new Promise((resolve) => {
      this.authenticate().then((headers) => {
        request.get({
          url: `${env.site}/${endpoint}`,
          headers,
        }).then((response) => {
          const json = JSON.parse(response);
          resolve(json);
        }).catch((response) => {
          this.handle(response);
        });
      });
    });
    return get;
  },

  /**
   * Install migration list
   * @return {void}
   */
  install() {
    this.get('/_api/web').then((response) => {
      log.info(`The site title is ${response.d.Title}.`);
    });
  },

  /**
   * Get current migration status
   * @type {void}
   */
  status() {
    this.get("/_api/web/lists/getbytitle('_migrations')").then((response) => {
      log.info(response);
    });
  },
};

module.exports = Engineer;
