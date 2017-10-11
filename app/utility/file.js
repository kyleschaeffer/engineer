const amp = require('amp-utils');
const fs = require('fs');

module.exports = {
  /**
   * Path builder
   * @param  {String}  path
   * @param  {Boolean} cwd
   * @return {String}
   */
  path(path, cwd = true) {
    return `${cwd ? process.cwd() : __dirname}/${amp.string.trimSlashes(path)}`;
  },

  /**
   * Does path exist?
   * @param  {String}  path
   * @param  {Boolean} cwd
   * @return {Boolean}
   */
  exists(path, cwd = true) {
    return fs.existsSync(this.path(path, cwd));
  },

  /**
   * Create directory
   * @param  {String}  dir
   * @param  {Boolean} cwd
   * @return {void}
   */
  mkdir(dir, cwd = true) {
    if (!this.exists(dir, cwd)) fs.mkdirSync(this.path(dir, cwd));
  },

  /**
   * Read file contents
   * @param  {String}  path
   * @param  {Boolean} cwd
   * @param  {String}  flag
   * @return {String}
   */
  read(path, cwd = true, flag = 'r') {
    return fs.readFileSync(this.path(path, cwd), { flag });
  },

  /**
   * Get file paths from directory
   * @param  {String}  path
   * @param  {Boolean} cwd
   * @return {Array}
   */
  readDir(path, cwd = true) {
    if (!this.exists(path, cwd)) return null;
    return fs.readdirSync(this.path(path, cwd));
  },

  /**
   * Require from file
   * @param  {String}  path
   * @param  {Boolean} cwd
   * @return {Object}
   */
  load(path, cwd = true) {
    if (!path || !this.exists(path, cwd)) return {};
    return require(this.path(path, cwd));
  },

  /**
   * Write contents to file (relative to working directory)
   * @param  {String}  path
   * @param  {Boolean} cwd
   * @param  {String}  contents
   * @param  {String}  flag
   * @return {void}
   */
  write(path, cwd = true, contents, flag = 'wx+') {
    fs.writeFileSync(this.path(path, cwd), contents, { flag });
  },

  /**
   * Create a new file from a template
   * @param  {String}  template
   * @param  {String}  path
   * @param  {Boolean} cwd
   * @param  {String}  flag
   * @return {void}
   */
  fromTemplate(template, path, cwd = true, flag = 'wx+') {
    this.write(path, cwd, this.read(`../templates/${template}`, false), flag);
  },

  /**
   * Get file name from path
   * @param  {String}  path
   * @param  {Boolean} cwd
   * @param  {Boolean} ext
   * @return {String}
   */
  name(path, ext = true) {
    let file = path.split('/').pop();
    if (!ext) file = file.replace(/\.\w+$/, '');
    return file;
  },
};
