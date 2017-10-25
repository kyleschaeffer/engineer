const _ = require('lodash');
const bus = require('../bus');
const csom = require('csom-node');
const Task = require('../task');
const utility = require('../../utility');

/**
 * Field link collection
 * @type {FieldLinks}
 */
class FieldLinks {
  /**
   * Constructor
   * @param {Object} params
   * @return {FieldLinks}
   */
  constructor(params = {}) {
    // Properties
    _.merge(this, {
      $parent: null,
    }, params);

    return this;
  }

  /**
   * Get field links
   * @return {pnp.FieldLinks}
   */
  get() {
    return this.$parent.get().fieldLinks;
  }

  /**
   * Add field link to content type
   * @param {string} fieldName
   * @return {void}
   */
  add(fieldName) {
    bus.load(new Task((resolve) => {
      // Get parents
      const parents = utility.sharepoint.getParents(this);

      // Connect, then add content type to target
      utility.sharepoint.configureCsom(parents.web.Url).then(() => {
        try {
          // Target web or list
          let target = csom.web;

          // Target object
          if (parents.list) target = parents.list.Title ? target.get_lists().getByTitle(parents.list.Title) : target.get_lists().getById(parents.list.Id);

          // Get content type
          const contentType = target.get_contentTypes().getById(this.$parent.id());

          // Get field
          const field = target.get_fields().getByInternalNameOrTitle(fieldName);

          // Add field link
          const fieldLink = new SP.FieldLinkCreationInformation(); // eslint-disable-line no-undef
          fieldLink.set_field(field);
          const fieldLinks = contentType.get_fieldLinks();
          fieldLinks.add(fieldLink);
          contentType.update(true);

          // Commit
          utility.log.info({
            level: 2,
            key: 'fieldLink.add',
            tokens: {
              fieldName,
              contentType: this.$parent.Name || this.$parent.Id,
            },
          });
          csom.ctx.executeQueryAsync(() => {
            resolve();
          }, (sender, args) => {
            utility.log.error({ content: args.get_message() });
            resolve();
          });
        }
        catch (e) {
          utility.log.error({ content: e.message });
          resolve();
        }
      });
    }));
  }

  /**
   * Remove field link from content type
   * @param {string} fieldName
   * @return {void}
   */
  remove(fieldName) {
    bus.load(new Task((resolve) => {
      // Get parents
      const parents = utility.sharepoint.getParents(this);

      // Connect, then remove content type from target
      utility.sharepoint.configureCsom(parents.web.Url).then(() => {
        try {
          // Target web or list
          let target = csom.web;

          // Target object
          if (parents.list) target = parents.list.Title ? target.get_lists().getByTitle(parents.list.Title) : target.get_lists().getById(parents.list.Id);

          // Get content type
          const contentType = target.get_contentTypes().getById(this.$parent.id());

          // Remove field link
          const fieldLinks = contentType.get_fieldLinks();
          csom.ctx.load(fieldLinks);

          // Commit
          utility.log.info({
            level: 2,
            key: 'fieldLink.remove',
            tokens: {
              fieldName,
              contentType: this.$parent.Name || this.$parent.Id,
            },
          });
          csom.ctx.executeQueryAsync(() => {
            const allFieldLinks = fieldLinks.getEnumerator();
            while (allFieldLinks.moveNext()) {
              const fieldLink = allFieldLinks.get_current();
              if (fieldLink.get_name() === fieldName) {
                fieldLink.deleteObject();
                break;
              }
            }
            contentType.update(true);
            csom.ctx.executeQueryAsync(() => {
              resolve();
            }, (sender, args) => {
              utility.log.error({ content: args.get_message() });
              resolve();
            });
          }, (sender, args) => {
            utility.log.error({ content: args.get_message() });
            resolve();
          });
        }
        catch (e) {
          utility.log.error({ content: e.message });
          resolve();
        }
      });
    }));
  }
}

module.exports = FieldLinks;
