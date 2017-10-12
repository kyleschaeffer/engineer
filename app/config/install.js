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
    engineer.list.create({
      list: {
        Title: sharepoint.lists.migrations,
        Description: 'Migrations tracking list installed automatically by Engineer',
        Hidden: true,
        NoCrawl: true,
      },
    });

    // Migrated field
    engineer.field.create({
      field: {
        FieldTypeKind: 'Boolean',
        Title: 'Migrated',
        Description: 'Current migration status',
        DefaultValue: '0',
      },
      list: sharepoint.lists.migrations,
    });
    engineer.viewField.add({
      field: 'Migrated',
      list: sharepoint.lists.migrations,
      view: 'All Items',
    });

    // Manifest list
    engineer.list.create({
      list: {
        Title: sharepoint.lists.manifest,
        Description: 'Manifest tracking list installed automatically by Engineer',
        Hidden: true,
        NoCrawl: true,
      },
    });

    // Type field
    engineer.field.create({
      field: {
        FieldTypeKind: 'Choice',
        Title: 'Type',
        Description: 'The type of entry',
        Choices: [
          'ContentType',
          'SiteColumn',
        ],
        DefaultValue: 'ContentType',
        Required: true,
      },
      list: sharepoint.lists.manifest,
    });
    engineer.viewField.add({
      field: 'Type',
      list: sharepoint.lists.manifest,
      view: 'All Items',
    });

    // Value field
    engineer.field.create({
      field: {
        FieldTypeKind: 'Text',
        Title: 'Value',
        Description: 'The content type or site column ID associated with this entry',
      },
      list: sharepoint.lists.manifest,
    });
    engineer.viewField.add({
      field: 'Value',
      list: sharepoint.lists.manifest,
      view: 'All Items',
    });
  },

  /**
   * Run these tasks when rolling back this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  down(engineer) {
    engineer.list.delete(sharepoint.lists.migrations);
    engineer.list.delete(sharepoint.lists.manifest);
  },
};
