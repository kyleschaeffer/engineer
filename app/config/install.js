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
    engineer.task(pnp => pnp.sp.web.lists.add(sharepoint.lists.migrations, 'Migrations tracking list installed automatically by Engineer', 100, true, {
      Hidden: true,
      NoCrawl: true,
    }));

    // Migrated field
    engineer.task(pnp => pnp.sp.web.lists.getByTitle(sharepoint.lists.migrations).fields.add('Migrated', 'SP.Field', {
      DefaultValue: '0',
      Description: 'Current migration status',
      FieldTypeKind: 8,
      Group: 'Engineer',
    }));

    // Add Migrated to view
    engineer.task(pnp => pnp.sp.web.lists.getByTitle(sharepoint.lists.migrations).views.getByTitle('All Items').fields.add('Migrated'));

    // Manifest list
    engineer.task(pnp => pnp.sp.web.lists.add(sharepoint.lists.manifest, 'Content type ID tracking list installed automatically by Engineer', 100, true, {
      Hidden: true,
      NoCrawl: true,
    }));

    // Value field
    engineer.task(pnp => pnp.sp.web.lists.getByTitle(sharepoint.lists.manifest).fields.addMultilineText('Value', 2, false, false, false, false, {
      Description: 'Content type ID',
      Group: 'Engineer',
    }));

    // Add Value to view
    engineer.task(pnp => pnp.sp.web.lists.getByTitle(sharepoint.lists.manifest).views.getByTitle('All Items').fields.add('Value'));
  },

  /**
   * Run these tasks when rolling back this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  down(engineer) {
    // Delete lists
    engineer.task(pnp => pnp.sp.web.lists.getByTitle(sharepoint.lists.migrations).delete());
    engineer.task(pnp => pnp.sp.web.lists.getByTitle(sharepoint.lists.manifest).delete());
  },
};
