const config = require('../config');
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

      // Create migration list
      sharepoint.list.create({
        list: {
          Description: 'Migrations tracking list installed automatically by Engineer',
          Hidden: true,
          Title: config.sharepoint.lists.migrations,
        },
        onStart: () => {
          utility.log.info('Installing Engineer lists...');
        },
      }).then(() => {
        utility.log.success('done.\nEngineer has been installed.\n');
      }).catch((response) => {
        utility.log.error('done.\n');
        utility.error.handle(response);
      });
    });
  },
};
