module.exports = {
  /**
   * Run these tasks when activating this migration. Visit
   * http://sp-engineer.org/migrations/ for more information on Engineer
   * migrations.
   */
  up(engineer) {
    engineer.web.lists.add('My List');
  },

  /**
   * Run these tasks when rolling back this migration. Visit
   * http://sp-engineer.org/migrations/ for more information on Engineer
   * migrations.
   */
  down(engineer) {
    engineer.web.lists.getByTitle('My List').delete();
  },
};
