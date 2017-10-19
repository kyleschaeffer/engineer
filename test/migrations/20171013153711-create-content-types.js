module.exports = {
  /**
   * Run these tasks when activating this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  up(engineer) {
    // Create content type
    engineer.web.contentTypes.add({
      ParentContentTypeId: '0x01',
      Name: 'TestContentType',
      Description: 'A test content type',
      Group: '_Test Content Types',
    });

    // Add fields
    engineer.web.contentTypes.getByName('TestContentType').fieldLinks.add('TestTextField');
  },

  /**
   * Run these tasks when rolling back this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  down(engineer) {
    // Remove fields
    engineer.web.contentTypes.getByName('TestContentType').fieldLinks.remove('TestTextField');

    // Delete content type
    engineer.web.contentTypes.getByName('TestContentType').delete();
  },
};
