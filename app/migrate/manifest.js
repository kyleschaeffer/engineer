const config = require('../config');
const pnp = require('sp-pnp-js');
const utility = require('../utility');

const Manifest = {
  /**
   * Manifest data
   * @type {Object}
   */
  data: {},

  /**
   * Get manifest data
   * @return {Promise}
   */
  get() {
    const p = new Promise((resolve) => {
      // Get data
      utility.log.info('manifest.get', {}, false);
      pnp.sp.web.lists.getByTitle(config.sharepoint.lists.manifest).items.get().then((items) => {
        utility.log.success('success.done');

        // Save data
        items.forEach((item) => {
          Manifest.data[item.Title] = item;
        });

        resolve();
      }).catch(() => {
        utility.log.success('success.done');
        resolve();
      });
    });
    return p;
  },

  /**
   * Save response content type data to manifest
   * @param {Object} response
   * @return {Promise}
   */
  process(response) {
    return new Promise((resolve) => {
      if (!response || !response.data || !response.data.Name || !response.data.StringId) resolve();
      else Manifest.save(response.data.Name, response.data.StringId).then(resolve);
    });
  },

  /**
   * Update migration status
   * @param {string} name
   * @param {string} id
   * @return {Promise}
   */
  save(name, id) {
    const p = new Promise((resolve) => {
      // Get content type
      const contentType = Manifest.data[name];
      // utility.log.info('manifest.set', { contentType: name }, false);

      // Create new manifest
      if (!contentType) {
        pnp.sp.web.lists.getByTitle(config.sharepoint.lists.manifest).items.add({
          Title: name,
          Value: id,
        }).then(() => {
          // utility.log.success('success.done');
          Manifest.data[name] = {
            Title: name,
            Value: id,
          };
          resolve();
        });
      }

      // Update manifest
      else {
        pnp.sp.web.lists.getByTitle(config.sharepoint.lists.manifest).items.getById(contentType.Id).update({
          Value: id,
        }).then(() => {
          // utility.log.success('success.done');
          Manifest.data[name] = {
            Title: name,
            Value: id,
          };
          resolve();
        });
      }
    });
    return p;
  },
};

module.exports = Manifest;
