const config = require('../config');
const Migration = require('../migrate/migration');
const utility = require('../utility');

module.exports = {
  /**
   * Install Engineer
   * @return {Promise}
   */
  run() {
    const p = new Promise((resolve) => {
      // Install migration
      const install = new Migration({
        up(engineer) {
          engineer.list.create({
            list: {
              Description: 'Migrations tracking list installed automatically by Engineer',
              Hidden: true,
              Title: config.sharepoint.lists.migrations,
            },
          });
          engineer.list.create({
            list: {
              Description: 'Manifest tracking list installed automatically by Engineer',
              Hidden: true,
              Title: config.sharepoint.lists.manifest,
            },
          });
        },
      });

      // Run
      utility.log.info('install.begin');
      install.run().then(() => {
        utility.log.success('install.complete');
        resolve();
      });
    });
    return p;
  },
};
