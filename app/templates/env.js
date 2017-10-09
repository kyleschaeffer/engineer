/**
 * This environment configuration file defines your SharePoint environment
 * settings and authentication method.
 *
 * IMPORTANT: Be sure to ignore this file from code repositories so as not to
 * share your sensitive authentication information.
 */
module.exports = {
  /**
   * The URL of the SharePoint site
   * @type {String}
   */
  site: 'https://contoso.sharepoint.com',

  /**
   * Authentication configuration provided to node-sp-auth for authenticating to
   * SharePoint. Supports SAML (default), NTLM, FBA, ADFS, add-ins, and more.
   *
   * See https://github.com/s-KaiNet/node-sp-auth#params for details and
   * examples of the various options.
   * @type {Object}
   */
  auth: {
    username: 'you@contoso.com',
    password: 'password',
  },

  /**
   * Language setting for localization
   * @type {String}
   */
  lang: 'en',
};
