const manifest = require('../migrate/manifest');
const status = require('../migrate/status');
const utility = require('../utility');

module.exports = {
  /**
   * Get current manifest
   * @return {void}
   */
  run() {
    // Get status and manifest
    status.get().then(() => {
      // Table rows
      const rows = [];

      // Add row for each entry
      Object.keys(manifest.data).forEach((key) => {
        rows.push([
          manifest.data[key].Title,
          manifest.data[key].Value,
        ]);
      });

      // Empty
      if (!rows.length) rows.push([utility.log.translate('manifest.empty')]);

      // Show table
      utility.log.table(rows);

      // Not installed
      if (!status.installed) {
        utility.log.warning({
          level: 3,
          key: 'status.uninstalled',
        });
      }
    });
  },
};
