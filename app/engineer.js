const _ = require('lodash');
const commands = require('./commands');
const config = require('./config');
const utility = require('./utility');

const Engineer = {
  /**
   * Engineer commands
   */
  commands,

  /**
   * Load configuration from file
   * @param {string} path
   * @return {Promise}
   */
  load(path = 'env.js') {
    return new Promise((resolve) => {
      // Load config file
      const options = utility.file.load(path);

      // No config
      if (!options || !options.site) utility.log.fail({ key: 'config.failed', tokens: { path: utility.file.path(path) } });

      // Configure
      utility.log.info({
        key: 'config.using',
        tokens: { path: utility.file.path(path) },
      });
      _.merge(config.env, options);

      // Set up authentication
      utility.sharepoint.setup().then(resolve);
    });
  },
};

module.exports = Engineer;
