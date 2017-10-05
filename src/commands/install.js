const sharepoint = require('../sharepoint');
const utility = require('../utility');

module.exports = {
  /**
   * Install Engineer
   * @return {void}
   */
  run() {
    // Check to see if migration list already exists
    utility.log.info('Analyzing site...\n');
    sharepoint.list.get({
      title: '_migrations',
    }).then(() => {
      utility.log.warning('Engineer has already been installed.\n');
    }).catch(() => {
      // Create migration list
      utility.log.info('Installing...');
      sharepoint.list.create({
        list: {
          Description: 'Migrations tracking list installed automatically by Engineer',
          Hidden: true,
          Title: '_migrations',
        },
      }).then(() => {
        utility.log.success('installed.\n');
      });
    });
  },
};
