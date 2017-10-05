const sharepoint = require('../sharepoint');
const utility = require('../utility');

module.exports = {
  /**
   * Uninstall Engineer
   * @return {void}
   */
  run() {
    utility.log.info('Analyzing site...\n');
    sharepoint.list.get({
      title: '_migrations',
    }).then(() => {
      sharepoint.list.delete({
        title: '_migrations',
      }).then(() => {
        utility.log.success('uninstalled.\n');
      });
    }).catch(() => {
      utility.log.warning('Engineer is not installed.\n');
    });
  },
};
