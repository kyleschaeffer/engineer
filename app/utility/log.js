const _ = require('lodash');
const colors = require('colors'); // eslint-disable-line no-unused-vars
const config = require('../config');
const lang = require('../lang');
const Table = require('cli-table');

const Log = {
  /**
   * Print to log
   * @param {string} str
   * @return {void}
   */
  print(str) {
    return process.stdout.write(str);
  },

  /**
   * Dump to log
   * @param {Object} obj
   * @return {void}
   */
  dump(obj) {
    return console.log(obj);
  },

  /**
   * Log info
   * @param {string} str
   * @param {Object} tokens
   * @return {void}
   */
  info(str, tokens = {}) {
    if (typeof str !== 'string') return this.dump(str);
    return this.print(this.translate(str, tokens));
  },

  /**
   * Log error
   * @param {string} str
   * @param {Object} tokens
   * @return {void}
   */
  error(str, tokens = {}) {
    if (typeof str !== 'string') return this.dump(str);
    return this.print(this.translate(str, tokens).red);
  },

  /**
   * Log warning
   * @param {string} str
   * @param {Object} tokens
   * @return {void}
   */
  warning(str, tokens = {}) {
    if (typeof str !== 'string') return this.dump(str);
    return this.print(this.translate(str, tokens).yellow);
  },

  /**
   * Log important
   * @param {string} str
   * @param {Object} tokens
   * @return {void}
   */
  important(str, tokens = {}) {
    if (typeof str !== 'string') return this.dump(str);
    return this.print(this.translate(str, tokens).cyan);
  },

  /**
   * Log success
   * @param {string} str
   * @param {Object} tokens
   * @return {void}
   */
  success(str, tokens = {}) {
    if (typeof str !== 'string') return this.dump(str);
    return this.print(this.translate(str, tokens).green);
  },

  /**
   * Get localized language string
   * @param {string} key
   * @param {Object} tokens
   * @return {String}
   */
  translate(key, tokens = {}) {
    const translation = _.get(lang, `${config.env.lang}.${key}`, _.get(lang, `en.${key}`, key));
    if (translation === key) return translation;
    const template = _.template(translation);
    return template(tokens);
  },

  /**
   * Log tabular data
   * @param {Array} columns
   * @param {Array} rows
   * @return {void}
   */
  table(rows = []) {
    const table = new Table();
    rows.forEach((row) => {
      table.push(row);
    });
    return this.dump(table.toString());
  },
};

module.exports = Log;
