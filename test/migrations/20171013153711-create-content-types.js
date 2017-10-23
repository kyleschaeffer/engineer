module.exports = {
  /**
   * Run these tasks when activating this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  up(engineer) {
    // Create content type fields
    engineer.web.fields.add('TestContentTypeField1');
    engineer.web.fields.add('TestContentTypeField2');
    engineer.web.fields.add('TestContentTypeField3');

    // Create content type
    engineer.web.contentTypes.add({
      ParentContentTypeId: '0x01',
      Name: 'TestContentType',
      Description: 'A test content type',
      Group: '_Test Content Types',
    });

    // Add fields
    engineer.web.contentTypes.getByName('TestContentType').fieldLinks.add('TestContentTypeField1');
    engineer.web.contentTypes.getByName('TestContentType').fieldLinks.add('TestContentTypeField2');
    engineer.web.contentTypes.getByName('TestContentType').fieldLinks.add('TestContentTypeField3');
  },

  /**
   * Run these tasks when rolling back this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  down(engineer) {
    // Remove fields
    engineer.web.contentTypes.getByName('TestContentType').fieldLinks.remove('TestContentTypeField1');
    engineer.web.contentTypes.getByName('TestContentType').fieldLinks.remove('TestContentTypeField2');
    engineer.web.contentTypes.getByName('TestContentType').fieldLinks.remove('TestContentTypeField3');

    // Delete content type
    engineer.web.contentTypes.getByName('TestContentType').delete();

    // Delete content type fields
    engineer.web.fields.getByTitle('TestContentTypeField1').delete();
    engineer.web.fields.getByTitle('TestContentTypeField2').delete();
    engineer.web.fields.getByTitle('TestContentTypeField3').delete();
  },
};
