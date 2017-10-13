const cp = require('copy-paste');
const utility = require('../utility');
const uuid = require('uuid/v4');

module.exports = {
  /**
   * Generate random GUID string
   * @return {Promise}
   */
  run() {
    const p = new Promise(() => {
      const guid = uuid();
      cp.copy(guid);
      utility.log.info('guid.complete');
      utility.log.table([[utility.log.translate('guid.guid').green, guid]]);
    });
    return p;
  },
};
