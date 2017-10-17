const config = require('../config');
const manifest = require('./manifest');
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
      // Suppress error logging
      utility.log.suppress();

      // Get migration status
      utility.log.info('status.get', {}, false);
      pnp.sp.web.lists.getByTitle(config.sharepoint.lists.migrations).items.get().then((items) => {
        utility.log.success('success.done');

        // Save history
        this.installed = true;
        items.forEach((item) => {
          this.history[item.Title] = item;
        });

        // Get manifest data
        manifest.get().then(() => {
          // Restore logging
          utility.log.restore();
          resolve();
        });
      }).catch(() => {
        utility.log.success('success.done');

        // Get manifest data
        manifest.get().then(() => {
          // Restore logging
          utility.log.restore();
          resolve();
        });
      });
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
      utility.log.info('status.set', { migration: name }, false);

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
