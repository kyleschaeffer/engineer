const commands = require('./commands');
const config = require('./config');

module.exports = {
  commands,

  /**
   * Load configuration from file
   * @param  {String} path
   * @return {void}
   */
  load(path = null) {
    config.env.load(path || 'env.js');
  },
};
