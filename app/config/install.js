const sharepoint = require('./sharepoint');
// const utility = require('../utility');

/**
 * Migration for installing Engineer
 */
module.exports = {
  /**
   * Install Engineer lists and fields
   */
  up(engineer) {
    // Migrations list
    engineer.web.lists.add({
      Title: sharepoint.lists.migrations,
      Description: 'install.list.migrations',
      BaseTemplate: 100,
      ContentTypesEnabled: true,
      Hidden: true,
      NoCrawl: true,
    });

    // Migrated field
    engineer.web.lists.getByTitle(sharepoint.lists.migrations).fields.add({
      Type: 'Boolean',
      Title: 'Migrated',
      Description: 'install.list.migrated',
      Group: 'Engineer',
      DefaultValue: '0',
    });

    // Add Migrated to view
    engineer.web.lists.getByTitle(sharepoint.lists.migrations).views.getByTitle('All Items').viewFields.add('Migrated');

    // Manifest list
    engineer.web.lists.add({
      Title: sharepoint.lists.manifest,
      Description: 'install.list.manifest',
      BaseTemplate: 100,
      ContentTypesEnabled: true,
      Hidden: true,
      NoCrawl: true,
    });

    // Value field
    engineer.web.lists.getByTitle(sharepoint.lists.manifest).fields.add({
      Type: 'MultiLineText',
      Title: 'Value',
      Description: 'install.list.value',
      Group: 'Engineer',
      NumberOfLines: 2,
      RichText: false,
      AllowHyperlink: false,
      RestrictedMode: false,
      AppendOnly: false,
    });

    // Add Value to view
    engineer.web.lists.getByTitle(sharepoint.lists.manifest).views.getByTitle('All Items').viewFields.add('Value');
  },

  /**
   * Uninstall Engineer lists
   */
  down(engineer) {
    // Delete lists
    engineer.web.lists.getByTitle(sharepoint.lists.migrations).delete();
    engineer.web.lists.getByTitle(sharepoint.lists.manifest).delete();
  },
};
