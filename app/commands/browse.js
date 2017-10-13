const config = require('../config');
const open = require('open');
const utility = require('../utility');

module.exports = {
  /**
   * Open SharePoint list in web browser
   * @param  {String} list
   * @return {Promise}
   */
  run(list = null) {
    const p = new Promise((resolve) => {
      // Build list URI
      const path = `${config.env.site}${list ? `/Lists/${config.sharepoint.lists[list] ? config.sharepoint.lists[list] : list}` : ''}`;

      // Open
      utility.log.info('browse.begin', { path });
      open(path);

      resolve();
    });
    return p;
  },
};
