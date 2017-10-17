module.exports = {
  /**
   * Run these tasks when activating this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  up(engineer) {
    // Create content type
    engineer.task(pnp => pnp.sp.web.contentTypes.add('0x01000D11931E4784CC488B49472B60DDE8DC', 'TestContentType', 'A test content type', '_Test Content Types', {
      FieldLinks: {
        results: [
          {
            __metadata: {
              type: 'SP.FieldLink',
            },
            Id: '6df9bd52-550e-4a30-bc31-a4366832a87d',
            Name: 'Category',
            Required: false,
          },
        ],
      },
    }).then(engineer.saveContentType));

    // Add fields to content type
    // engineer.task(pnp => pnp.sp.web.contentTypes.getById(engineer.getContentType('TestContentType')).fieldLinks.add('TestBooleanField'));
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
