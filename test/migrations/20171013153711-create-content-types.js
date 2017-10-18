module.exports = {
  /**
   * Run these tasks when activating this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  up(engineer) {
    // Create content type
    engineer.task(pnp => pnp.sp.web.contentTypes.add('0x01000D11931E4784CC488B49472B60DDE8DC', 'TestContentType', 'A test content type', '_Test Content Types').then(engineer.saveContentType));

    // Add fields
    engineer.contentTypes.fields.add('TestContentType', 'TestTextField');
  },

  /**
   * Run these tasks when rolling back this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  down(engineer) {
    // Delete content type
    engineer.task(pnp => pnp.sp.web.contentTypes.getById(engineer.getContentType('TestContentType')).delete());
  },
};
