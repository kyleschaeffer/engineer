module.exports = {
  /**
   * Run these tasks when activating this migration. See
   * https://github.com/sprtus/engineer for more information on
   * Engineer tasks.
   */
  up(engineer) {
    // Create web
    engineer.web.webs.add({
      Title: 'Test Web 1',
      Url: 'test-web-one',
      Description: 'A test web',
      WebTemplate: 'STS',
    });

    // Create sub-web (URL is omitted, will be slugged from title)
    engineer.getWeb('test-web-one').webs.add({
      Title: 'Test Sub',
      Description: 'A test sub-web',
      WebTemplate: 'CMSPUBLISHING',
    });
  },

  /**
   * Run these tasks when rolling back this migration. See
   * https://github.com/sprtus/engineer for more information on
   * Engineer tasks.
   */
  down(engineer) {
    // Delete webs
    engineer.getWeb('test-web-one/test-sub').delete();
    engineer.getWeb('test-web-one').delete();
  },
};
