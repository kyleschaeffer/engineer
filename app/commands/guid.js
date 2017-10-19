const cp = require('copy-paste');
const utility = require('../utility');

module.exports = {
  /**
   * Generate random GUID string
   * @return {void}
   */
  run() {
    const guid = utility.sharepoint.guid();
    cp.copy(guid);
    utility.log.info('guid.complete');
    utility.log.table([[utility.log.translate('guid.guid').green, guid]]);
  },
};
