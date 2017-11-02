const cp = require('copy-paste');
const utility = require('../utility');

module.exports = {
  /**
   * Generate random GUID string
   * @param {Object} options
   * @return {void}
   */
  run(options) {
    const guid = utility.sharepoint.guid(options.simple);
    cp.copy(guid);
    utility.log.info({
      level: 2,
      key: 'guid.complete',
    });
    utility.log.table([[utility.log.translate('guid.guid'), guid]]);
  },
};
