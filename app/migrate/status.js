const config = require('../config');
const pnp = require('sp-pnp-js');
const utility = require('../utility');

const Status = {
  /**
   * Migration history
   * @type {Object}
   */
  history: {},

  /**
   * Is Engineer installed?
   * @type {boolean}
   */
  installed: false,

  /**
   * Get migration history
   * @return {Promise}
   */
  get() {
    const p = new Promise((resolve) => {
      // Get migration status
      pnp.sp.web.lists.getByTitle(config.sharepoint.lists.migrations).items.get().then((items) => {
        // Save history
        this.installed = true;
        items.forEach((item) => {
          this.history[item.Title] = item;
        });
        resolve();
      }).catch(resolve);
    });
    return p;
  },

  /**
   * Update migration status
   * @param {string} name
   * @param {boolean} migrated
   * @return {Promise}
   */
  update(name, migrated) {
    const p = new Promise((resolve) => {
      // Get migration
      const migration = Status.history[name];
      utility.log.info('status.set', { migration: name });

      // Create new status
      if (!migration) {
        pnp.sp.web.lists.getByTitle(config.sharepoint.lists.migrations).items.add({
          Title: name,
          Migrated: migrated,
        }).then(() => {
          utility.log.success('success.done');
          resolve();
        });
      }

      // Update status
      else {
        pnp.sp.web.lists.getByTitle(config.sharepoint.lists.migrations).items.getById(migration.Id).update({
          Migrated: migrated,
        }).then(() => {
          utility.log.success('success.done');
          resolve();
        });
      }
    });
    return p;
  },
};

module.exports = Status;
