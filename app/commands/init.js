const utility = require('../utility');

module.exports = {
  /**
   * Initialize Engineer in the current working directory
   * @return {void}
   */
  run() {
    utility.log.info({
      level: 2,
      key: 'init.begin',
    });
    utility.log.indent();

    // .gitignore
    utility.log.info({
      level: 2,
      key: 'init.ignore',
      nl: false,
    });

    // Create new file
    if (!utility.file.exists('.gitignore')) {
      utility.file.write('.gitignore', true, '/env.js\n');
      utility.log.info({
        level: 2,
        key: 'success.done',
      });
    }

    // Already exists
    else {
      utility.log.warning({
        level: 2,
        key: 'error.exists',
      });
    }

    // env.js
    utility.log.info({
      level: 2,
      key: 'init.env',
      nl: false,
    });

    // Create new file
    if (!utility.file.exists('env.js')) {
      utility.file.fromTemplate('env.js', 'env.js', true, 'w+');
      utility.log.info({
        level: 2,
        key: 'success.done',
      });
    }

    // Already exists
    else {
      utility.log.warning({
        level: 2,
        key: 'error.exists',
      });
    }

    utility.log.outdent();
    utility.log.info({
      level: 2,
      key: 'init.complete',
    });
  },
};
