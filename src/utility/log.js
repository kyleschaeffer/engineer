const colors = require('colors');

const Log = {
  /**
   * Print to log
   * @param  {String} str
   * @return {void}
   */
  print(str) {
    return process.stdout.write(str);
  },

  /**
   * Dump to log
   * @param  {Object} obj
   * @return {void}
   */
  dump(obj) {
    return console.log(obj);
  },

  /**
   * Log info
   * @param  {String} str
   * @return {void}
   */
  info(str) {
    if (typeof (str) !== 'string') return this.dump(str);
    return this.print(str);
  },

  /**
   * Log error
   * @param  {String} str
   * @return {void}
   */
  error(str) {
    if (typeof (str) !== 'string') return this.dump(str);
    return this.print(str.red);
  },

  /**
   * Log warning
   * @param  {String} str
   * @return {void}
   */
  warning(str) {
    if (typeof (str) !== 'string') return this.dump(str);
    return this.print(str.yellow);
  },

  /**
   * Log important
   * @param  {String} str
   * @return {void}
   */
  important(str) {
    if (typeof (str) !== 'string') return this.dump(str);
    return this.print(str.cyan);
  },

  /**
   * Log success
   * @param  {String} str
   * @return {void}
   */
  success(str) {
    if (typeof (str) !== 'string') return this.dump(str);
    return this.print(str.green);
  },
};

module.exports = Log;
