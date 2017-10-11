const config = require('../config');
const sharepoint = require('../sharepoint');
const utility = require('../utility');

module.exports = {
  /**
   * Migration history
   * @type {Object}
   */
  history: {},

  /**
   * Is Engineer installed?
   * @type {Boolean}
   */
  installed: false,

  /**
   * Get migration history
   * @return {Promise}
   */
  get() {
    const p = new Promise((resolve) => {
      // Get migration status
      sharepoint.request.get({
        onError: () => {
          utility.log.success('success.done');
        },
        onStart: () => {
          utility.log.info('status.get');
        },
        onSuccess: () => {
          utility.log.success('success.done');
        },
        uri: `_api/web/lists/getbytitle('${config.sharepoint.lists.migrations}')/items`,
      }).then((response) => {
        // Build history
        if (response.d && response.d.results) {
          this.installed = true;
          response.d.results.forEach((item) => {
            this.history[item.Title] = {
              id: item.Id,
              title: item.Title,
              migrated: item.Migrated,
            };
          });
        }

        resolve();
      });
    });
    return p;
  },

  /**
   * Update migration status
   * @param  {String}  name
   * @param  {Boolean} migrated
   * @return {Promise}
   */
  update(name, migrated) {
    const p = new Promise((resolve) => {
      // Get migration
      const migration = this.history[name];

      // Create new status
      if (!migration) {
        sharepoint.request.post({
          body: {
            __metadata: {
              type: `SP.Data.${config.sharepoint.lists.migrations}ListItem`,
            },
            Title: name,
            Migrated: migrated,
          },
          onError: (response) => {
            utility.log.error('error.failed');
            utility.error.handle(response);
          },
          onStart: () => {
            utility.log.info('status.set', { migration: name });
          },
          onSuccess: () => {
            utility.log.success('success.done');
          },
          uri: `_api/web/lists/getbytitle('${config.sharepoint.lists.migrations}')/items`,
        }).then(() => {
          resolve();
        });
      }

      // Update status
      else {
        sharepoint.request.update({
          body: {
            __metadata: {
              type: `SP.Data.${config.sharepoint.lists.migrations}ListItem`,
            },
            Migrated: migrated,
          },
          onError: (response) => {
            utility.log.error('error.failed');
            utility.error.handle(response);
          },
          onStart: () => {
            utility.log.info('status.set', { migration: migration.name });
          },
          onSuccess: () => {
            utility.log.success('success.done');
          },
          uri: `_api/web/lists/getbytitle('${config.sharepoint.lists.migrations}')/items(${migration.id})`,
        }).then(() => {
          resolve();
        });
      }
    });
    return p;
  },
};
