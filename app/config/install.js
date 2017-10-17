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
  up(engineer) {
    // Migrations list
    engineer.task(pnp => pnp.sp.web.lists.ensure(sharepoint.lists.migrations, 'Migrations tracking list installed automatically by Engineer', 100, true, {
      Hidden: true,
      NoCrawl: true,
    }));

    // Migrated field
    engineer.task(pnp => pnp.sp.web.lists.getByTitle(sharepoint.lists.migrations).fields.add('Migrated', 'SP.FieldBoolean', {
      DefaultValue: '0',
      Description: 'Current migration status',
      FieldTypeKind: 8,
      Group: 'Engineer',
    }));

    // Add Migrated to view
    engineer.task(pnp => pnp.sp.web.lists.getByTitle(sharepoint.lists.migrations).views.getByTitle('All Items').fields.add('Migrated'));
  },

  /**
   * Run these tasks when rolling back this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  down(engineer) {
    // Delete migrations list
    engineer.task(pnp => pnp.sp.web.lists.getByTitle(sharepoint.lists.migrations).delete());
  },
};
