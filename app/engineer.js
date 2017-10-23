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
   * @param {Object} program
   * @return {Promise}
   */
  load(program) {
    return new Promise((resolve) => {
      // Config file
      const path = program.config || 'env.js';
      const options = utility.file.load(path);

      // No config
      if (!options || !options.site) utility.log.fail({ key: 'config.failed', tokens: { path: utility.file.path(path) } });

      // Configure
      utility.log.info({
        key: 'config.using',
        tokens: { path: utility.file.path(path) },
      });
      _.merge(config.env, options);

      // Quiet mode
      if (program.quiet) config.env.logLevel = 99;

      // Info mode
      if (program.info) config.env.logLevel = 1;

      // Verbose mode
      if (program.verbose) config.env.logLevel = 0;

      // Set up authentication
      utility.sharepoint.setup().then(resolve);
    });
  },
};

module.exports = Engineer;
