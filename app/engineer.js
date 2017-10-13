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
   * @param  {String} path
   * @return {void}
   */
  load(path = './env.js') {
    // Load config file
    const options = utility.file.load(path);

    // No config
    if (!options || !options.site) utility.error.fail('error.config', { path: utility.file.path(path) });

    // Configure
    utility.log.important('config.using', { path: utility.file.path(path) });
    _.extend(config, options);
  },
};

module.exports = Engineer;
