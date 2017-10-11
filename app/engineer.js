const amp = require('amp-utils');
const commands = require('./commands');
const config = require('./config');
const utility = require('./utility');

module.exports = {
  commands,

  /**
   * Load configuration from file
   * @param  {String} path
   * @return {void}
   */
  load(path = './env.js') {
    // Welcome
    // utility.log.important('app.welcome');

    // Load config file
    const options = amp.options({}, utility.file.load(path));

    // No config
    if (!options.site) utility.error.fail('error.config', { path: utility.file.path(path) });

    // Configure
    utility.log.important('config.using', { path: utility.file.path(path) });
    if (options.auth) config.env.auth = amp.options(config.env.auth, options.auth);
    if (options.lang) config.env.lang = options.lang;
    if (options.site) config.env.site = amp.string.trimSlashes(options.site);
  },
};
