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
            Description: 'Migrations tracking list installed automatically by Engineer',
            Hidden: true,
            Title: config.sharepoint.lists.migrations,
          });
          engineer.list.create({
            Description: 'Manifest tracking list installed automatically by Engineer',
            Hidden: true,
            Title: config.sharepoint.lists.manifest,
          });
        },
      });

      // Run
      install.run().then(() => {
        utility.log.success('Install complete.\n');
        resolve();
      });
    });
    return p;
  },
};
