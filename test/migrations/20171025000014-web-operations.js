module.exports = {
  /**
   * Run these tasks when activating this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  up(engineer) {
    // Fields
    engineer.getWeb('test-web-one').fields.add('TestWebField1');

    // Lists
    engineer.getWeb('test-web-one').lists.add('TestWebList1');

    // Content types
    engineer.getWeb('test-web-one').contentTypes.add({
      ParentContentTypeId: '0x01',
      Name: 'TestWebContentType',
      Description: 'A test web content type',
      Group: '_Test Web Content Types',
    });

    // Field links
    engineer.getWeb('test-web-one').contentTypes.getByName('TestWebContentType').fieldLinks.add('TestWebField1');

    // List content types
    engineer.getWeb('test-web-one').lists.getByTitle('TestWebList1').contentTypes.addAvailable('TestWebContentType');
    engineer.getWeb('test-web-one').lists.getByTitle('TestWebList1').contentTypes.order('TestWebContentType');
  },

  /**
   * Run these tasks when rolling back this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  down(engineer) {
    // List content types
    engineer.getWeb('test-web-one').lists.getByTitle('TestWebList1').contentTypes.getByName('TestWebContentType').delete();

    // Field links
    engineer.getWeb('test-web-one').contentTypes.getByName('TestWebContentType').fieldLinks.remove('TestWebField1');

    // Lists
    engineer.getWeb('test-web-one').lists.getByTitle('TestWebList1').delete();

    // Content types
    engineer.getWeb('test-web-one').contentTypes.getByName('TestWebContentType').delete();

    // Fields
    engineer.getWeb('test-web-one').fields.getByTitle('TestWebField1').delete();
  },
};
