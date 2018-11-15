/**
 * This environment configuration file defines your SharePoint environment
 * settings and authentication method.
 *
 * IMPORTANT: Be sure to ignore this file from code repositories so as not to
 * share your sensitive authentication information.
 */
module.exports = {
  /**
   * SharePoint site URL
   */
  site: 'https://contoso.sharepoint.com',

  /**
   * Authentication configuration for node-sp-auth
   * - See https://github.com/s-KaiNet/node-sp-auth#params for possible configurations
   * - Leave as `null` to prompt for authentication and store it in a locally encrypted file (recommended)
   */
  auth: null,

  /**
   * Language setting for string localization
   */
  lang: 'en_us',
};
