const _ = require('lodash');
const moment = require('moment');
const utility = require('../utility');

module.exports = {
  /**
   * Create new migration file
   * @param {string} name
   * @return {void}
   */
  run(name = 'New Migration') {
    // Create migration
    utility.log.info('make.begin', { name }, false);

    // Create migrations directory
    utility.file.mkdir('migrations');

    // Generate timestamped file path
    const path = `migrations/${moment().utc().format('YYYYMMDDHHmmss')}-${_.kebabCase(name)}.js`;

    // Write file from template
    utility.file.fromTemplate('migration.js', path);
    utility.log.success('success.done');
  },
};
