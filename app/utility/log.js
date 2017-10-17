const _ = require('lodash');
const colors = require('colors'); // eslint-disable-line no-unused-vars
const config = require('../config');
const lang = require('../lang');
const Table = require('cli-table');

const Log = {
  /**
   * Temporary storage for suppressed logging
   */
  oldLogLevel: null,
  oldStopOnError: null,

  /**
   * Listener for sp-pnp-js logging
   * @param {LogEntry} entry
   * @return {void}
   */
  listener(entry) {
    if (config.env.logLevel === 0) {
      Log.dump(entry);
    }

    else if (entry.level && entry.level >= config.env.logLevel) {
      // Error
      if (entry.level === 3) {
        if (entry.data && entry.data.responseBody) Log.error('app.string', { string: entry.data.responseBody['odata.error'].message.value });
        else Log.error('app.string', { string: entry.message });
        if (config.env.stopOnError) Log.fail();
      }

      // Warning
      else if (entry.level === 2) Log.warning('app.string', { string: entry.message });

      // Info
      else Log.info('app.string', { string: entry.message });
    }
  },

  /**
   * Suppress logging
   * @return {void}
   */
  suppress() {
    Log.oldLogLevel = config.env.logLevel;
    Log.oldStopOnError = config.env.stopOnError;
    config.env.logLevel = 4;
    config.env.stopOnError = false;
  },

  /**
   * Restore suppressed logging
   * @return {void}
   */
  restore() {
    config.env.logLevel = Log.oldLogLevel;
    config.env.stopOnError = Log.oldStopOnError;
  },

  /**
   * End the process
   * @param {string} key
   * @param {Object} tokens
   * @return {void}
   */
  fail(key = null, tokens = {}) {
    if (key) Log.error(key, tokens);
    process.exit();
  },

  /**
   * Print to log
   * @param {string} str
   * @param {boolean} nl
   * @return {void}
   */
  print(str, nl = true) {
    return process.stdout.write(`${str}${nl ? '\n' : ''}`);
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
   * @param {boolean} nl
   * @return {void}
   */
  info(str, tokens = {}, nl = true) {
    if (typeof str !== 'string') return Log.dump(str);
    return Log.print(Log.translate(str, tokens), nl);
  },

  /**
   * Log error
   * @param {string} str
   * @param {Object} tokens
   * @param {boolean} nl
   * @return {void}
   */
  error(str, tokens = {}, nl = true) {
    if (typeof str !== 'string') return Log.dump(str);
    return Log.print(Log.translate(str, tokens).red, nl);
  },

  /**
   * Log warning
   * @param {string} str
   * @param {Object} tokens
   * @param {boolean} nl
   * @return {void}
   */
  warning(str, tokens = {}, nl = true) {
    if (typeof str !== 'string') return Log.dump(str);
    return Log.print(Log.translate(str, tokens).yellow, nl);
  },

  /**
   * Log important
   * @param {string} str
   * @param {Object} tokens
   * @param {boolean} nl
   * @return {void}
   */
  important(str, tokens = {}, nl = true) {
    if (typeof str !== 'string') return Log.dump(str);
    return Log.print(Log.translate(str, tokens).cyan, nl);
  },

  /**
   * Log success
   * @param {string} str
   * @param {Object} tokens
   * @param {boolean} nl
   * @return {void}
   */
  success(str, tokens = {}, nl) {
    if (typeof str !== 'string') return Log.dump(str);
    return Log.print(Log.translate(str, tokens).green, nl);
  },

  /**
   * Get localized language string
   * @param {string} key
   * @param {Object} tokens
   * @return {string}
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
    return Log.dump(table.toString());
  },
};

module.exports = Log;
