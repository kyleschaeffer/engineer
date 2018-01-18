module.exports = {
  /**
   * Run these tasks when activating this migration. See
   * https://github.com/sprtus/engineer for more information on
   * Engineer tasks.
   */
  up(engineer) {
    // Add lists
    engineer.web.lists.add('TestList1');
    engineer.web.lists.add('TestList2');
    engineer.web.lists.add('TestList3');
  },

  /**
   * Run these tasks when rolling back this migration. See
   * https://github.com/sprtus/engineer for more information on
   * Engineer tasks.
   */
  down(engineer) {
    // Delete lists
    engineer.web.lists.getByTitle('TestList1').delete();
    engineer.web.lists.getByTitle('TestList2').delete();
    engineer.web.lists.getByTitle('TestList3').delete();
  },
};
