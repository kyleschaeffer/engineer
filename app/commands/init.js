const utility = require('../utility');

module.exports = {
  /**
   * Initialize Engineer in the current working directory
   * @return {void}
   */
  run() {
    // .gitignore
    utility.log.info('init.ignore', {}, false);

    // Create new file
    if (!utility.file.exists('.gitignore')) {
      utility.file.write('.gitignore', true, '/env.js\n');
      utility.log.success('success.done');
    }

    // Already exists
    else utility.log.warning('error.exists');

    // env.js
    utility.log.info('init.env', {}, false);

    // Create new file
    if (!utility.file.exists('env.js')) {
      utility.file.fromTemplate('env.js', 'env.js', true, 'w+');
      utility.log.success('success.done');
    }

    // Already exists
    else utility.log.warning('error.exists');
  },
};
