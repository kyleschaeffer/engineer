const bus = require('../bus');

/**
 * Set or reset the site context for future tasks
 * @param  {String} path
 * @return {void}
 */
const site = function site(path = '') {
  bus.site = path;
};

module.exports = site;
