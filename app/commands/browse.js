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
      const path = list ? `${config.env.site}/Lists/${config.sharepoint.lists[list] ? config.sharepoint.lists[list] : list}` : config.env.site;

      // Open
      utility.log.info(`Opening ${path} in web browser...\n`);
      open(path);
      resolve();
    });
    return p;
  },
};
