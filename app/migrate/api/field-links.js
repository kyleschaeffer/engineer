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
      // Get content type
      const contentType = csom.web.get_contentTypes().getById(this.$parent.id());

      // Get field
      const field = csom.web.get_fields().getByInternalNameOrTitle(fieldName);

      // Add field link
      const fieldLink = new SP.FieldLinkCreationInformation();
      fieldLink.set_field(field);
      const fieldLinks = contentType.get_fieldLinks();
      fieldLinks.add(fieldLink);
      contentType.update(true);

      // Commit
      csom.ctx.executeQueryAsync(() => {
        resolve();
      }, (sender, args) => {
        utility.log.error('app.string', { string: args.get_message() });
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
      // Get content type
      const contentType = csom.web.get_contentTypes().getById(this.$parent.id());

      // Remove field link
      const fieldLinks = contentType.get_fieldLinks();
      csom.ctx.load(fieldLinks);

      // Commit
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
          utility.log.error('app.string', { string: args.get_message() });
        });
      }, (sender, args) => {
        utility.log.error('app.string', { string: args.get_message() });
      });
    }));
  }
}

module.exports = FieldLinks;
