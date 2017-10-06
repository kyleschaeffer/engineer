const utility = require('../utility');

module.exports = {
  /**
   * Initialize Engineer in the current working directory
   * @return {Promise}
   */
  run() {
    const p = new Promise((resolve) => {
      // Create .gitignore if it doesn't exist
      if (!utility.file.exists('.gitignore')) utility.file.write('.gitignore', '/env.js\n');

      // Create config file
      utility.log.info('Creating environment config file...');

      // Write file from template
      utility.file.fromTemplate('env.js', 'env.js', 'w+');
      utility.log.success('done.\n');
      utility.log.info('Environment config file: ');
      utility.log.important(`${process.cwd()}/env.js\n`);

      // Done
      utility.log.success('Setup complete.\n');
      resolve();
    });
    return p;
  },
};
