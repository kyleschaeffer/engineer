const moment = require('moment');
const utility = require('../utility');

module.exports = {
  /**
   * Create new migration file
   * @param  {String} name
   * @return {void}
   */
  run(name = 'New Migration') {
    // Create migration
    utility.log.info(`Creating migration ${name}...`);

    // Create migrations directory
    utility.file.mkdir('migrations');

    // Generate timestamped file path
    const path = `migrations/${moment().utc().format('YYYYMMDDHHmmss')}-${utility.file.slug(name)}.js`;

    // Write file from template
    utility.file.fromTemplate('migration.js', path);
    utility.log.success('done.\n');
    utility.log.info('New migration file: ');
    utility.log.important(`${process.cwd()}/${path}\n`);
  },
};
