const utility = require('../utility');

module.exports = {
  /**
   * SharePoint site
   * @type {String}
   */
  site: '',

  /**
   * Authentication configuration for node-sp-auth
   * @type {Object}
   */
  auth: {},

  /**
   * Load new env configuration from file path
   * @param  {String} path
   * @return {void}
   */
  load(path = null) {
    // Options
    const options = utility.config.options({
      auth: {},
      site: null,
    }, utility.config.load(path));

    // No config
    if (!options.site) utility.error.fail(`Failed to load configuration file: ${utility.file.path(path)}`);

    // Found config
    else utility.log.important(`Using configuration file ${utility.file.path(path)}.\n`);

    // Auth
    if (options.auth) this.auth = utility.config.options(this.auth, options.auth);

    // Site
    if (options.site) this.site = utility.file.trim(options.site);
  },
};
