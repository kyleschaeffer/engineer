const log = require('./log');

module.exports = {
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
    log.error('error.message', {
      code: response.statusCode,
      message,
    });
  },

  /**
   * End the process
   * @param  {String} message
   * @param  {Object} tokens
   * @return {void}
   */
  fail(message = null, tokens = {}) {
    if (message) log.error(message, tokens);
    process.exit();
  },
};
