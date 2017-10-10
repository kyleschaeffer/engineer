const config = require('../config');
const Migration = require('../migrate/migration');
const utility = require('../utility');

module.exports = {
  /**
   * Install Engineer
   * @return {Promise}
   */
  run() {
    const p = new Promise((resolve) => {
      // Install migration
      const install = new Migration({
        up(engineer) {
          // Migrations list
          engineer.list.create({
            list: {
              Description: 'Migrations tracking list installed automatically by Engineer',
              Hidden: true,
              Title: config.sharepoint.lists.migrations,
            },
          });
          engineer.field.create({
            field: {
              Title: 'Migrated',
              FieldTypeKind: 'Boolean',
              DefaultValue: '0',
            },
            list: config.sharepoint.lists.migrations,
          });
          engineer.viewField.add({
            field: 'Migrated',
            list: config.sharepoint.lists.migrations,
            view: 'All Items',
          });

          // Manifest list
          engineer.list.create({
            list: {
              Description: 'Manifest tracking list installed automatically by Engineer',
              Hidden: true,
              Title: config.sharepoint.lists.manifest,
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
            list: config.sharepoint.lists.manifest,
          });
          engineer.field.create({
            field: {
              Title: 'Value',
              FieldTypeKind: 'Text',
              Required: true,
            },
            list: config.sharepoint.lists.manifest,
          });
          engineer.viewField.add({
            field: 'Type',
            list: config.sharepoint.lists.manifest,
            view: 'All Items',
          });
          engineer.viewField.add({
            field: 'Value',
            list: config.sharepoint.lists.manifest,
            view: 'All Items',
          });
        },
      });

      // Run
      utility.log.info('install.begin');
      install.run().then(() => {
        utility.log.success('install.complete');
        resolve();
      });
    });
    return p;
  },
};
