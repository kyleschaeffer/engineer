const env = require('../env');
const log = require('./log');
const request = require('request-promise');
const spauth = require('node-sp-auth');

const Engineer = {
  /**
   * Authentication headers are stored for subsequent requests
   * @type {Object}
   */
  headers: null,

  /**
   * Store form digest for subsequent requests
   * @type {String}
   */
  digest: null,

  /**
   * Authenticate to SharePoint
   * @return {Promise}
   */
  authenticate() {
    const p = new Promise((resolve) => {
      // Already authenticated
      if (this.headers) {
        resolve();
        return;
      }

      // Authenticate
      log.info(`Authenticating to ${env.site}...`);
      spauth.getAuth(env.site, env.auth).then((options) => {
        this.headers = options.headers;
        this.headers.Accept = 'application/json;odata=verbose';
        this.headers['content-type'] = 'application/json;odata=verbose';
        log.success('Authenticated.');
        this.getDigest().then(() => {
          resolve();
        });
      }).catch((response) => {
        const title = response.message.match(/<S:Text.*?>(.*)<\/S:Text>/)[1];
        const message = response.message.match(/<psf:text>(.*)<\/psf:text>/)[1];
        log.error(`${title}: ${message}`);
      });
    });
    return p;
  },

  /**
   * Get form digest value
   * @return {Promise}
   */
  getDigest() {
    const p = new Promise((resolve) => {
      // Existing digest
      if (this.digest) {
        resolve();
        return;
      }

      // Get digest value
      this.post('/_api/contextinfo', {}, () => {
        log.info(`Getting form digest value from ${env.site}...`);
      }).then((response) => {
        this.digest = response.d.GetContextWebInformation.FormDigestValue;
        this.headers['X-RequestDigest'] = this.digest;
        log.success('Digest value retrieved.');
        resolve();
      }).catch((response) => {
        this.handle(response);
      });
    });
    return p;
  },

  /**
   * Handle SharePoint error response
   * @param {Object} response
   * @type {void}
   */
  handle(response) {
    let message = 'Unknown error.';

    // Detailed SharePoint error message
    if (response.error && response.error.error && response.error.error.message && response.error.error.message.value) message = response.error.error.message.value;

    // Generic status message
    else if (response.response && response.response.statusMessage && response.response.statusMessage.length) message = `${response.response.statusMessage}`;

    // Log
    log.error(`Error (${response.statusCode}): ${message}`);
  },

  /**
   * Perform request to endpoint URL
   * @param  {String} url
   * @param  {String} method
   * @param  {Object} body
   * @return {Promise}
   */
  request(url, method = 'GET', body = {}, json = true) {
    // Trim slashes from API url
    const endpoint = url.replace(/^\/|\/$/g, '');

    // Request
    const r = new Promise((resolve, reject) => {
      request({
        method,
        uri: `${env.site}/${endpoint}`,
        headers: this.headers,
        body,
        json,
      }).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(response);
      });
    });
    return r;
  },

  /**
   * Get data from endpoint URL
   * @param  {String} url
   * @param  {Event}  onStart
   * @return {Promise}
   */
  get(url, onStart = () => {}) {
    const r = new Promise((resolve, reject) => {
      // Authenticate, then request
      if (!this.headers) {
        this.authenticate().then(() => {
          // onStart event
          onStart();

          // Request
          this.request(url).then((response) => {
            resolve(response);
          }).catch((response) => {
            reject(response);
          });
        });
      }

      // Already authenticated
      else {
        // onStart event
        onStart();

        // Request
        this.request(url).then((response) => {
          resolve(response);
        }).catch((response) => {
          reject(response);
        });
      }
    });
    return r;
  },

  /**
   * Post data to endpoint URL
   * @param  {String} url
   * @param  {Object} data
   * @param  {Event}  onStart
   * @return {Promise}
   */
  post(url, data = {}, onStart = () => {}) {
    const r = new Promise((resolve, reject) => {
      // Authenticate, then request
      if (!this.headers) {
        this.authenticate().then(() => {
          // onStart event
          onStart();

          // Request
          this.request(url, 'POST', data).then((response) => {
            resolve(response);
          }).catch((response) => {
            reject(response);
          });
        });
      }

      // Already authenticated
      else {
        // onStart event
        onStart();

        // Request
        this.request(url, 'POST', data).then((response) => {
          resolve(response);
        }).catch((response) => {
          reject(response);
        });
      }
    });
    return r;
  },

  /**
   * Install migration list
   * @return {void}
   */
  install() {
    this.post('/_api/web/lists', {
      __metadata: {
        type: 'SP.List',
      },
      AllowContentTypes: true,
      BaseTemplate: 100,
      ContentTypesEnabled: true,
      Description: 'My list description',
      Title: 'Test title',
    }).then(() => {
      log.success(`Migration list installed successfully at ${env.site}/Lists/_migrations.`);
    }).catch((response) => {
      this.handle(response);
    });
    // this.get('/_api/web/lists/getbytitle(\'_migrations\')', () => {
    //   log.info('Reading SharePoint site...');
    // }).then(() => {
    //   log.warning('The migration list has already been installed.');
    // }).catch(() => {
    //   log.info('Creating migrations list...');
    // });
  },

  /**
   * Get current migration status
   * @type {void}
   */
  status() {
    this.get('/_api/web/lists/getbytitle(\'_migrations\')', () => {
      log.info('Reading migration list...');
    }).then((response) => {
      log.info(response);
    }).catch(() => {
      log.warning('The migrations list is not installed. Run "engineer install" to begin.');
    });
  },
};

module.exports = Engineer;
