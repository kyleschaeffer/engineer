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
      sharepoint.web.get().lists.getByTitle(config.sharepoint.lists.migrations).items.get().then((items) => {
        this.installed = true;
        items.forEach((item) => {
          this.history[item.Title] = item;
        });
        resolve();
      }).catch(utility.error.handle);
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
      utility.log.info('status.set', { migration: name });

      // Create new status
      if (!migration) {
        sharepoint.web.get().lists.getByTitle(config.sharepoint.lists.migrations).items.add({
          Title: name,
          Migrated: migrated,
        }).then(() => {
          utility.log.success('success.done');
          resolve();
        }).catch(utility.error.handle);
      }

      // Update status
      else {
        sharepoint.web.get().lists.getByTitle(config.sharepoint.lists.migrations).items.getById(migration.Id).update({
          Migrated: migrated,
        }).then(() => {
          utility.log.success('success.done');
          resolve();
        }).catch(utility.error.handle);
      }
    });
    return p;
  },
};
