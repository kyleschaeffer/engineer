const amp = require('amp-utils');
const cp = require('copy-paste');
const utility = require('../utility');

module.exports = {
  /**
   * Generate random GUID string
   * @return {Promise}
   */
  run() {
    const p = new Promise(() => {
      const guid = amp.string.guid();
      cp.copy(guid);
      utility.log.info('guid.complete');
      utility.log.table([[utility.log.translate('guid.guid').green, guid]]);
    });
    return p;
  },
};
