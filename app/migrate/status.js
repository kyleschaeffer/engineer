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
      utility.log.info({
        key: 'status.get',
        nl: false,
      });

      // Suppress error logging
      utility.log.suppress();

      // Get status
      pnp.sp.web.lists.getByTitle(config.sharepoint.lists.migrations).items.get().then((items) => {
        utility.log.restore();
        utility.log.info({ key: 'success.done' });

        // Save history
        this.installed = true;
        items.forEach((item) => {
          this.history[item.Title] = item;
        });

        // Get manifest data
        manifest.get().then(resolve);
      }).catch((response) => {
        utility.log.restore();
        utility.log.info({ key: 'success.done' });

        // Check for authentication
        utility.log.authCheck(response);

        // Get manifest data
        manifest.get().then(resolve);
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
      utility.log.info({
        key: 'status.set',
        tokens: { migration: name },
        nl: false,
      });

      // Create new status
      if (!migration) {
        pnp.sp.web.lists.getByTitle(config.sharepoint.lists.migrations).items.add({
          Title: name,
          Migrated: migrated,
        }).then(() => {
          utility.log.info({ key: 'success.done' });
          resolve();
        });
      }

      // Update status
      else {
        pnp.sp.web.lists.getByTitle(config.sharepoint.lists.migrations).items.getById(migration.Id).update({
          Migrated: migrated,
        }).then(() => {
          utility.log.info({ key: 'success.done' });
          resolve();
        });
      }
    });
    return p;
  },
};

module.exports = Status;
