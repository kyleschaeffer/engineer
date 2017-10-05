const fs = require('fs');
const moment = require('moment');
const utility = require('../utility');

module.exports = {
  /**
   * Create new migration file
   * @param  {String} name
   * @return {void}
   */
  run(name = 'New Migration') {
    // Create migrations directory
    const dir = `${process.cwd()}/migrations`;
    if (!fs.existsSync(dir)) {
      utility.log.info('Creating migrations directory...');
      fs.mkdirSync(dir, (err) => {
        if (err) utility.log.error(`done.\nError creating migrations directory: ${err}\n`);
        else utility.log.success('done.\n');
      });
    }

    // Create migration
    utility.log.info(`Creating migration ${name}...`);

    // Generate UTC timestamp
    const ts = moment().utc().format('YYYYMMDDHHmmss');

    // Generate file path
    const path = `${dir}/${ts}-${utility.url.slug(name)}.js`;

    // Get template contents
    const template = fs.readFileSync(`${__dirname}/../templates/migration.js`);

    // Create file
    fs.writeFileSync(path, template, { flag: 'wx+' }, (err) => {
      if (err) utility.log.error(`done.\nError creating migration file: ${err}\n`);
    });

    // Done
    utility.log.success(`Migration file created: ${path}\n`);
  },
};
