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
   * Require from file
   * @param  {String} path
   * @return {Object}
   */
  load(path) {
    if (!path || !this.exists(path)) return {};
    return require(this.path(path));
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
   * @param  {String} flag
   * @return {void}
   */
  fromTemplate(template, path, flag = 'wx+') {
    this.write(path, fs.readFileSync(`${__dirname}/../templates/${template}`), flag);
  },
};
