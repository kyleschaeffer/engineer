module.exports = {
  /**
   * Build configuration object with default values
   * @param  {Object} defaultConfig
   * @param  {Object} config
   * @return {Object}
   */
  options(defaultConfig = {}, config = {}) {
    return this.merge({}, defaultConfig, config);
  },

  /**
   * Deep merge objects
   * @param  {Object} target
   * @param  {Object} sources
   * @return {Object}
   */
  merge(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();
    if (this.isObject(target) && this.isObject(source)) {
      for (const key in source) {
        if (this.isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          this.merge(target[key], source[key]);
        }
        else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
    return this.merge(target, ...sources);
  },

  /**
   * Is this an object?
   * @param  {Object} el
   * @return {Boolean}
   */
  isObject(el) {
    return el && typeof (el) === 'object' && !Array.isArray(el);
  },
};
