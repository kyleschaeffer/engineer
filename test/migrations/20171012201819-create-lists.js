module.exports = {
  /**
   * Run these tasks when activating this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  up(engineer) {
    engineer.task(pnp => pnp.sp.web.lists.add('My List', 'My list description', 100, true));
  },

  /**
   * Run these tasks when rolling back this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  down(engineer) {
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('My List').delete());
  },
};
