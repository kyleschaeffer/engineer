module.exports = {
  /**
   * Trim slashes from URI
   * @param  {String} uri
   * @return {[type]}
   */
  trim(uri = '') {
    return uri.replace(/^\/|\/$/g, '');
  },
};
