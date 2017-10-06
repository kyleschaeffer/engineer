const config = require('../config');
const open = require('open');
const utility = require('../utility');

module.exports = {
  /**
   * Open SharePoint list in web browser
   * @param  {String} list
   * @return {void}
   */
  run(list = null) {
    const path = list ? `${config.env.site}/Lists/${config.sharepoint.lists[list] ? config.sharepoint.lists[list] : list}` : config.env.site;
    utility.log.info(`Opening ${path} in web browser...\n`);
    open(path);
  },
};
