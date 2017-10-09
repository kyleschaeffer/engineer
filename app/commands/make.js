const amp = require('amp-utils');
const moment = require('moment');
const utility = require('../utility');

module.exports = {
  /**
   * Create new migration file
   * @param  {String} name
   * @return {Promise}
   */
  run(name = 'New Migration') {
    const p = new Promise((resolve) => {
      // Create migration
      utility.log.info('make.begin', { name });

      // Create migrations directory
      utility.file.mkdir('migrations');

      // Generate timestamped file path
      const path = `migrations/${moment().utc().format('YYYYMMDDHHmmss')}-${amp.string.slug(name)}.js`;

      // Write file from template
      utility.file.fromTemplate('migration.js', path);
      utility.log.success('success.done');

      resolve();
    });
    return p;
  },
};
