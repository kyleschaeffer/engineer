module.exports = {
  /**
   * Run these tasks when activating this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  up(engineer) {
    // Create content type
    engineer.contentType.create({
      contentType: {
        Id: '0x0100CF8C8F30CBCE4BA1B9E29FD675CCEBB0',
        Name: 'TestContentType',
        Description: 'A test content type',
        Group: null,
      },
    });
  },

  /**
   * Run these tasks when rolling back this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  down(engineer) {
    // Delete content type
    engineer.contentType.delete('0x0100CF8C8F30CBCE4BA1B9E29FD675CCEBB0');
  },
};
