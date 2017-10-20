module.exports = {
  /**
   * Run these tasks when activating this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  up(engineer) {
    // Create content type on web
    engineer.web.contentTypes.add({
      ParentContentTypeId: '0x01',
      Name: 'TestContentType',
      Description: 'A test content type',
      Group: '_Test Content Types',
    });

    // Add field
    engineer.web.contentTypes.getByName('TestContentType').fieldLinks.add('TestTextField');

    // Create content type on list
    engineer.web.lists.getByTitle('TestColumnsList').contentTypes.add({
      ParentContentTypeId: '0x01',
      Name: 'TestListContentType',
      Description: 'A test list content type',
      Group: '_Test Content Types',
    });

    // Add field
    engineer.web.lists.getByTitle('TestColumnsList').contentTypes.getByName('TestListContentType').fieldLinks.add('TestTextField');
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
