module.exports = {
  /**
   * Run these tasks when activating this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  up(engineer) {
    engineer.web.lists.add({
      Title: 'My List',
      Description: 'My list description',
      BaseTemplate: 100,
      ContentTypesEnabled: true,
    });
  },

  /**
   * Run these tasks when rolling back this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  down(engineer) {
    engineer.web.lists.getByTitle('My List').delete();
  },
};
