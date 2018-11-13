import { IMigration } from '../migrate/IMigration';
import { Env } from './Env';

/**
 * Engineer install migration
 */
export const InstallMigration: IMigration = {
  /**
   * Configure tasks that are executed on migration activation
   *
   * @param sp SharePoint REST API access via PnP-JS-Core (https://github.com/pnp/pnpjs/blob/dev/packages/sp/docs/index.md)
   */
  async up(sp) {
    // Create migrations list
    await sp.web.lists.add(Env.lists.migrations, 'Engineer migrations list', 100, true, {
      Hidden: true,
      NoCrawl: true,
    });

    // Create Migrated field
    await sp.web.lists.getByTitle(Env.lists.migrations).fields.addBoolean('Migrated');

    // Add Migrated field to view
    await sp.web.lists.getByTitle(Env.lists.migrations).views.getByTitle('All Items').fields.add('Migrated');
  },

  /**
   * Configure tasks that are executed on migration deactivation/rollback
   *
   * @param sp SharePoint REST API access via PnP-JS-Core (https://github.com/pnp/pnpjs/blob/dev/packages/sp/docs/index.md)
   */
  async down(sp) {
    // Delete migrations list
    await sp.web.lists.getByTitle(Env.lists.migrations).delete();
  },
};
