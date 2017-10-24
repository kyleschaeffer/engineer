module.exports = {
  /**
   * Authentication configuration for node-sp-auth
   * @type {Object}
   */
  auth: {},

  /**
   * Language setting for localization
   * @type {string}
   */
  lang: 'en',

  /**
   * Logging level
   * 0 = Verbose
   * 1 = Info
   * 2 = Warning
   * 3 = Error
   * 99 = Off
   * @type {Number}
   */
  logLevel: 2,

  /**
   * SharePoint site
   * @type {string}
   */
  site: null,

  /**
   * Halt tasks on error
   * @type {Boolean}
   */
  stopOnError: false,
};
