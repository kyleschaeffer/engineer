const fs = require('fs');

module.exports = {
  /**
   * Trim slashes on path
   * @param  {String} path
   * @return {String}
   */
  trim(path = '') {
    return path.replace(/^\/|\/$/g, '');
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

  /**
   * Return full path to given relative path
   * @param  {String} path
   * @return {String}
   */
  path(path) {
    return `${process.cwd()}/${this.trim(path)}`;
  },

  /**
   * Does path exist?
   * @param  {String} path
   * @return {Boolean}
   */
  exists(path) {
    return fs.existsSync(this.path(path));
  },

  /**
   * Create directory
   * @param  {String} dir
   * @return {void}
   */
  mkdir(dir) {
    if (!this.exists(dir)) fs.mkdirSync(this.path(dir));
  },

  /**
   * Read file contents
   * @param  {String} path
   * @return {String}
   */
  read(path, flag = 'r') {
    return fs.readFileSync(this.path(path), { flag });
  },

  /**
   * Write contents to file (relative to working directory)
   * @param  {String} path
   * @param  {String} contents
   * @param  {String} flag
   * @return {void}
   */
  write(path, contents, flag = 'wx+') {
    fs.writeFileSync(this.path(path), contents, { flag });
  },

  /**
   * Create a new file from a template
   * @param  {String} template
   * @param  {String} path
   * @return {void}
   */
  fromTemplate(template, path) {
    this.write(path, this.read(`app/templates/${template}`));
  },
};
