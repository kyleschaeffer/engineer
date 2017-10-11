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
        Description: 'Migrations tracking list installed automatically by Engineer',
        Hidden: true,
        Title: sharepoint.lists.migrations,
      },
    });
    engineer.field.create({
      field: {
        Title: 'Migrated',
        FieldTypeKind: 'Boolean',
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
        Description: 'Manifest tracking list installed automatically by Engineer',
        Hidden: true,
        Title: sharepoint.lists.manifest,
      },
    });
    engineer.field.create({
      field: {
        Title: 'Type',
        FieldTypeKind: 'Choice',
        Choices: {
          __metadata: {
            type: 'Collection(Edm.String)',
          },
          results: [
            'ContentType',
            'SiteColumn',
          ],
        },
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
    engineer.field.create({
      field: {
        Title: 'Value',
        FieldTypeKind: 'Text',
        Required: true,
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
