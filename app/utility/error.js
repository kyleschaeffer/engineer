const log = require('./log');

const error = {
  /**
   * Handle SharePoint error response
   * @param {Object} response
   * @param {boolean} failOnError
   * @type {void}
   */
  handle(response, failOnError = true) {
    let message = 'An error occurred.';
    let code = 'Unknown';

    // Authentication error
    if (response.message && typeof response.message === 'string') {
      code = 'Authentication';
      message = response.message.match(/<psf:text>(.*)<\/psf:text>/)[1];
    }

    // Detailed SharePoint error message
    else if (response.error && response.error.error && response.error.error.message && response.error.error.message.value) {
      code = response.statusCode;
      message = response.error.error.message.value;
    }

    // Generic status message
    else if (response.response && response.response.statusMessage && response.response.statusMessage.length) {
      code = response.statusCode;
      message = `${response.response.statusMessage}`;
    }

    // Log
    log.error('error.message', { code, message });

    // Fail?
    if (failOnError) error.fail();
  },

  /**
   * End the process
   * @param {string} message
   * @param {Object} tokens
   * @return {void}
   */
  fail(message = null, tokens = {}) {
    if (message) log.error(message, tokens);
    process.exit();
  },

  /**
   * Generic error handler
   * @param {Object} response
   * @return {void}
   */
  failed(response) {
    log.error('error.failed');
    error.handle(response);
  },

  /**
   * Generic success handler
   * @return {void}
   */
  success() {
    log.success('success.done');
  },
};

module.exports = error;
