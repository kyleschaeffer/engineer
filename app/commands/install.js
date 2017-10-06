const config = require('../config');
const Migration = require('../migrate/migration');
const sharepoint = require('../sharepoint');
const utility = require('../utility');

module.exports = {
  /**
   * Install Engineer
   * @return {void}
   */
  run() {
    // Check to see if migration list already exists
    sharepoint.list.get({
      onStart: () => {
        utility.log.info('Analyzing site...');
      },
      title: config.sharepoint.lists.migrations,
    }).then(() => {
      utility.log.warning('done.\nEngineer is already installed.\n');
    }).catch(() => {
      utility.log.success('done.\n');

      const install = new Migration({
        up(engineer) {
          // Create migrations list
          engineer.list.create({
            Description: 'Migrations tracking list installed automatically by Engineer',
            Hidden: true,
            Title: config.sharepoint.lists.migrations,
          });

          // Create manifest list
          engineer.list.create({
            Description: 'Manifest tracking list installed automatically by Engineer',
            Hidden: true,
            Title: config.sharepoint.lists.manifest,
          });
        },
      });

      install.run();
    });
  },
};
