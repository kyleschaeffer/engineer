const amp = require('amp-utils');
const colors = require('colors');
const config = require('../config');
const lang = require('../lang');

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
   * @param  {Object} tokens
   * @return {void}
   */
  info(str, tokens = {}) {
    if (typeof str !== 'string') return this.dump(str);
    return this.print(this.translate(str, tokens));
  },

  /**
   * Log error
   * @param  {String} str
   * @param  {Object} tokens
   * @return {void}
   */
  error(str, tokens = {}) {
    if (typeof str !== 'string') return this.dump(str);
    return this.print(this.translate(str, tokens).red);
  },

  /**
   * Log warning
   * @param  {String} str
   * @param  {Object} tokens
   * @return {void}
   */
  warning(str, tokens = {}) {
    if (typeof str !== 'string') return this.dump(str);
    return this.print(this.translate(str, tokens).yellow);
  },

  /**
   * Log important
   * @param  {String} str
   * @param  {Object} tokens
   * @return {void}
   */
  important(str, tokens = {}) {
    if (typeof str !== 'string') return this.dump(str);
    return this.print(this.translate(str, tokens).cyan);
  },

  /**
   * Log success
   * @param  {String} str
   * @param  {Object} tokens
   * @return {void}
   */
  success(str, tokens = {}) {
    if (typeof str !== 'string') return this.dump(str);
    return this.print(this.translate(str, tokens).green);
  },

  /**
   * Get localized language string
   * @param  {String} key
   * @param  {Object}  tokens
   * @return {String}
   */
  translate(key, tokens = {}) {
    let msg = key;
    try {
      msg = amp.object.byPath(lang, `${config.env.lang}.${key}`);
      if (!msg) msg = amp.object.byPath(lang, `en.${key}`);
    } catch (e) {
      return key;
    }
    Object.keys(tokens).forEach((token) => {
      const regex = new RegExp(`%${token}%`, 'i');
      msg = msg.replace(regex, tokens[token]);
    });
    return msg;
  },
};

module.exports = Log;
