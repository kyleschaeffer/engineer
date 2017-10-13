const sharepoint = require('./sharepoint');

/**
 * Migration for installing Engineer
 */
module.exports = {
  /**
   * Run these tasks when activating this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  up(engineer, web) {
    // Migrations list
    engineer.task(web.lists.add(sharepoint.lists.migrations, 'Migrations tracking list installed automatically by Engineer', true, {
      Hidden: true,
      NoCrawl: true,
    }));

    // Migrated field
    engineer.task(web.lists.getByTitle(sharepoint.lists.migrations).fields.add('Migrated', 'SP.BooleanField', {
      Description: 'Current migration status',
      DefaultValue: '0',
    }));
    engineer.task(web.lists.getByTitle(sharepoint.lists.migrations).views.getByTitle('All Items').fields.add('Migrated'));
  },

  /**
   * Run these tasks when rolling back this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  down(engineer, web) {
    engineer.task(() => {
      web.lists.getByTitle(sharepoint.lists.migrations).delete();
    });
  },
};
