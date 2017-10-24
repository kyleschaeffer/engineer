module.exports = {
  /**
   * Run these tasks when activating this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  up(engineer) {
    // Add list
    engineer.web.lists.add({
      Title: 'ContentTypeListTest',
      Description: 'A list for testing content type operations',
      BaseTemplate: 100,
      ContentTypesEnabled: true,
    });

    // Add content types
    engineer.web.lists.getByTitle('ContentTypeListTest').contentTypes.addAvailable('TestContentType');
    engineer.web.lists.getByTitle('ContentTypeListTest').contentTypes.addAvailable('TestContentType2');

    // Set available list content types
    engineer.web.lists.getByTitle('ContentTypeListTest').contentTypes.order(['TestContentType2', 'TestContentType']);
  },

  /**
   * Run these tasks when rolling back this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  down(engineer) {
    // Remove content types
    engineer.web.lists.getByTitle('ContentTypeListTest').contentTypes.getByTitle('TestContentType').delete();
    engineer.web.lists.getByTitle('ContentTypeListTest').contentTypes.getByTitle('TestContentType2').delete();

    // Delete list
    engineer.web.lists.getByTitle('ContentTypeListTest').delete();
  },
};
