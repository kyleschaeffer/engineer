/**
 * Engineer migration
 *
 * http://sp-engineer.org/
 */
module.exports = {
  /**
   * Executed on migration activation
   *
   * @param sp SharePoint REST API
   *  - https://github.com/pnp/pnpjs/blob/dev/packages/sp/docs/index.md
   */
  async up(sp) {
    // Create content type fields
    await sp.web.fields.addText('TestContentTypeField1').catch(() => {});
    await sp.web.fields.addText('TestContentTypeField2').catch(() => {});
    await sp.web.fields.addText('TestContentTypeField3').catch(() => {});

    // Create content type
    await sp.web.contentTypes.add('0x0100B1085999EC8C4A4A8C769B300CDC31A5', 'TestContentType', 'Test content type', '_Test Content Types').catch(() => {});

    // Add fields to content type
    // NO API FOR THIS!?
  },

  /**
   * Executed on migration deactivation/rollback
   *
   * @param sp SharePoint REST API
   *  - https://github.com/pnp/pnpjs/blob/dev/packages/sp/docs/index.md
   */
  async down(sp) {
    // Delete content type
    await sp.web.contenttypes.getById('0x0100B1085999EC8C4A4A8C769B300CDC31A5').delete().catch(() => {});

    // Delete fields
    await sp.web.fields.getByTitle('TestContentTypeField1').delete().catch(() => {});
    await sp.web.fields.getByTitle('TestContentTypeField2').delete().catch(() => {});
    await sp.web.fields.getByTitle('TestContentTypeField3').delete().catch(() => {});
  },
};
