const _ = require('lodash');
const fs = require('fs');

module.exports = {
  /**
   * Path builder
   * @param {string} path
   * @param {boolean} cwd
   * @return {String}
   */
  path(path, cwd = true) {
    return `${cwd ? process.cwd() : __dirname}/${_.trim(path, '/')}`;
  },

  /**
   * Does path exist?
   * @param {string} path
   * @param {boolean} cwd
   * @return {Boolean}
   */
  exists(path, cwd = true) {
    return fs.existsSync(this.path(path, cwd));
  },

  /**
   * Create directory
   * @param {string} dir
   * @param {boolean} cwd
   * @return {void}
   */
  mkdir(dir, cwd = true) {
    if (!this.exists(dir, cwd)) fs.mkdirSync(this.path(dir, cwd));
  },

  /**
   * Read file contents
   * @param {string} path
   * @param {boolean} cwd
   * @param {string} flag
   * @return {String}
   */
  read(path, cwd = true, flag = 'r') {
    return fs.readFileSync(this.path(path, cwd), { flag });
  },

  /**
   * Get file paths from directory
   * @param {string} path
   * @param {boolean} cwd
   * @return {Array}
   */
  readDir(path, cwd = true) {
    if (!this.exists(path, cwd)) return null;
    return fs.readdirSync(this.path(path, cwd));
  },

  /**
   * Require from file
   * @param {string} path
   * @param {boolean} cwd
   * @return {Object}
   */
  load(path, cwd = true) {
    if (!path || !this.exists(path, cwd)) return {};
    return require(this.path(path, cwd));
  },

  /**
   * Write contents to file (relative to working directory)
   * @param {string} path
   * @param {boolean} cwd
   * @param {string} contents
   * @param {string} flag
   * @return {void}
   */
  write(path, cwd = true, contents, flag = 'wx+') {
    fs.writeFileSync(this.path(path, cwd), contents, { flag });
  },

  /**
   * Create a new file from a template
   * @param {string} template
   * @param {string} path
   * @param {boolean} cwd
   * @param {string} flag
   * @return {void}
   */
  fromTemplate(template, path, cwd = true, flag = 'wx+') {
    this.write(path, cwd, this.read(`../templates/${template}`, false), flag);
  },

  /**
   * Get file name from path
   * @param {string} path
   * @param {boolean} cwd
   * @param {boolean} ext
   * @return {String}
   */
  name(path, ext = true) {
    let file = path.split('/').pop();
    if (!ext) file = file.replace(/\.\w+$/, '');
    return file;
  },
};
