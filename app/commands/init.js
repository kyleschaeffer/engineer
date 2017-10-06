const utility = require('../utility');

module.exports = {
  /**
   * Initialize Engineer in the current working directory
   * @return {void}
   */
  run() {
    // Create .gitignore if it doesn't exist
    if (!utility.file.exists('.gitignore')) utility.file.write('.gitignore', '/env.js\n');

    // Create config file
    utility.log.info('Creating environment config file...');

    // Write file from template
    utility.file.fromTemplate('env.js', 'env.js', 'w+');
    utility.log.success('done.\n');
    utility.log.info('Environment config file: ');
    utility.log.important(`${process.cwd()}/env.js\n`);
  },
};
