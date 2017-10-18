const bus = require('../bus');
const csom = require('csom-node');
const manifest = require('../manifest');
const pnp = require('sp-pnp-js');
const Task = require('../task');
const utility = require('../../utility');

/**
 * Content type resource
 * Microsoft documentation not available
 */
module.exports = {
  /**
   * Add new content type
   * @param {Object} params
   * @return {void}
   */
  create(params = {}) {
    bus.load(new Task((resolve) => {
      // Get parent content type
      const contentTypes = csom.web.get_contentTypes();
      const parent = contentTypes.getById('0x01');

      // Configure new content type
      const contentType = new SP.ContentTypeCreationInformation();
      contentType.set_name('TestContentType');
      contentType.set_description('A test content type');
      contentType.set_group('_Test Content Types');
      contentType.set_parentContentType(parent);

      // Add new content type
      contentTypes.add(contentType);

      // Commit
      csom.ctx.load(contentTypes);
      csom.ctx.executeQueryAsync(() => {
        console.log('Success!');
        resolve();
      }, (sender, args) => {
        console.log('Failed!', args.get_message());
      });
    }));
  },

  /**
   * Content type fields
   */
  fields: {
    /**
     * Add field to content type
     * @param {string} name
     */
    add(contentTypeName, fieldName) {
      bus.load(new Task((resolve) => {
        // Get content type
        const contentType = csom.web.get_contentTypes().getById(manifest.data[contentTypeName].Value);

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
          utility.log.fail('app.string', { string: args.get_message() });
        });
      }));
    },
  },
};
