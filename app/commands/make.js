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
    utility.log.info({
      level: 2,
      key: 'make.begin',
      tokens: { name },
      nl: false,
    });

    // Create migrations directory
    utility.file.mkdir('migrations');

    // Generate timestamped file path
    const path = `migrations/${moment().utc().format('YYYYMMDDHHmmss')}-${_.kebabCase(name)}.js`;

    // Write file from template
    utility.file.fromTemplate('migration.js', path);
    utility.log.info({
      level: 2,
      key: 'success.done',
    });
  },
};
