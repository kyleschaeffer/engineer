module.exports = {
  /**
   * Trim slashes from URI
   * @param  {String} uri
   * @return {[type]}
   */
  trim(uri = '') {
    return uri.replace(/^\/|\/$/g, '');
  },

  /**
   * Slugify the given string
   * @param  {String} str
   * @return {String}
   */
  slug(str = '') {
    return str.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  },
};
