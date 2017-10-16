const config = require('../config');
const open = require('open');
const utility = require('../utility');

module.exports = {
  /**
   * Open SharePoint list in web browser
   * @param {string} list
   * @return {void}
   */
  run(list = null) {
    // Build list URI
    const path = `${config.env.site}${list ? `/Lists/${config.sharepoint.lists[list] ? config.sharepoint.lists[list] : list}` : ''}`;

    // Open
    utility.log.info('browse.begin', { path });
    open(path);
  },
};
