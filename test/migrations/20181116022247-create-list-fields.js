/**
 * Engineer migration
 *
 * http://sp-engineer.org/
 */
module.exports = {
  /**
   * Executed on migration activation
   *
   * @param sp SharePoint REST API
   *  - https://github.com/pnp/pnpjs/blob/dev/packages/sp/docs/index.md
   */
  async up(sp) {
    // Create test list
    await sp.web.lists.add('TestFieldsList', 'Testing list fields');

    // Boolean
    await sp.web.lists.getByTitle('TestFieldsList').fields.add('TestBooleanField', 'SP.Field', {
      FieldTypeKind: 8,
      DefaultValue: '0',
      Description: 'Test field',
      Group: '_Test Fields',
    }).catch(() => {});

    // Choice
    await sp.web.lists.getByTitle('TestFieldsList').fields.add('TestChoiceField', 'SP.FieldChoice', {
      FieldTypeKind: 6,
      Choices: {
        results: [
          'Choice 1',
          'Choice 2',
          'Choice 3',
        ],
      },
      EditFormat: 0,
      FillInChoice: false,
      Description: 'Test field',
      Group: '_Test Fields',
    }).catch(() => {});

    // Currency
    await sp.web.lists.getByTitle('TestFieldsList').fields.add('TestCurrencyField', 'SP.FieldCurrency', {
      FieldTypeKind: 10,
      MinimumValue: 0,
      MaximumValue: 100,
      CurrencyLocaleId: 1033,
      Description: 'Test field',
      Group: '_Test Fields',
    }).catch(() => {});

    // DateTime
    await sp.web.lists.getByTitle('TestFieldsList').fields.add('TestDateTimeField', 'SP.FieldDateTime', {
      FieldTypeKind: 4,
      DisplayFormat: 0,
      FriendlyDisplayFormat: 0,
      DateTimeCalendarType: 1,
      Description: 'Test field',
      Group: '_Test Fields',
    }).catch(() => {});

    // Lookup
    await sp.web.lists.getByTitle('TestFieldsList').fields.addLookup('TestLookupField', '09e23ec2-dd4b-47f0-a87f-75e81f49d3fe', 'Title').catch(() => {});

    // MultiChoice
    await sp.web.lists.getByTitle('TestFieldsList').fields.add('TestMultiChoiceField', 'SP.FieldMultiChoice', {
      FieldTypeKind: 15,
      Choices: {
        results: [
          'Choice 1',
          'Choice 2',
          'Choice 3',
        ],
      },
      FillInChoice: false,
      Description: 'Test field',
      Group: '_Test Fields',
    }).catch(() => {});

    // MultiLineText
    await sp.web.lists.getByTitle('TestFieldsList').fields.add('TestMultiLineText', 'SP.FieldMultiLineText', {
      FieldTypeKind: 3,
      AllowHyperlink: false,
      AppendOnly: false,
      NumberOfLines: 6,
      RestrictedMode: false,
      RichText: false,
      Description: 'Test field',
      Group: '_Test Fields',
    }).catch(() => {});

    // Number
    await sp.web.lists.getByTitle('TestFieldsList').fields.add('TestNumberField', 'SP.FieldNumber', {
      FieldTypeKind: 9,
      MinimumValue: 0,
      MaximumValue: 100,
      Description: 'Test field',
      Group: '_Test Fields',
    }).catch(() => {});

    // Text
    await sp.web.lists.getByTitle('TestFieldsList').fields.add('TestTextField', 'SP.FieldText', {
      FieldTypeKind: 2,
      MaxLength: 255,
      Description: 'Test field',
      Group: '_Test Fields',
    }).catch(() => {});

    // Url
    await sp.web.lists.getByTitle('TestFieldsList').fields.add('TestUrlField', 'SP.FieldUrl', {
      FieldTypeKind: 11,
      DisplayFormat: 0,
      Description: 'Test field',
      Group: '_Test Fields',
    }).catch(() => {});

    // User
    await sp.web.lists.getByTitle('TestFieldsList').fields.add('TestUserField', 'SP.FieldUser', {
      FieldTypeKind: 20,
      SelectionMode: 0,
      Description: 'Test field',
      Group: '_Test Fields',
    }).catch(() => {});

    // Calculated
    await sp.web.lists.getByTitle('TestFieldsList').fields.addCalculated('TestCalculatedField', '=[TestNumberField]+10', 0, 9, {
      Description: 'Test field',
      Group: '_Test Fields',
    }).catch(() => {});
  },

  /**
   * Executed on migration deactivation/rollback
   *
   * @param sp SharePoint REST API
   *  - https://github.com/pnp/pnpjs/blob/dev/packages/sp/docs/index.md
   */
  async down(sp) {
    // Delete list fields
    await sp.web.lists.getByTitle('TestFieldsList').fields.getByTitle('TestCalculatedField').delete().catch(() => {});
    await sp.web.lists.getByTitle('TestFieldsList').fields.getByTitle('TestBooleanField').delete().catch(() => {});
    await sp.web.lists.getByTitle('TestFieldsList').fields.getByTitle('TestChoiceField').delete().catch(() => {});
    await sp.web.lists.getByTitle('TestFieldsList').fields.getByTitle('TestCurrencyField').delete().catch(() => {});
    await sp.web.lists.getByTitle('TestFieldsList').fields.getByTitle('TestDateTimeField').delete().catch(() => {});
    await sp.web.lists.getByTitle('TestFieldsList').fields.getByTitle('TestLookupField').delete().catch(() => {});
    await sp.web.lists.getByTitle('TestFieldsList').fields.getByTitle('TestMultiChoiceField').delete().catch(() => {});
    await sp.web.lists.getByTitle('TestFieldsList').fields.getByTitle('TestMultiLineText').delete().catch(() => {});
    await sp.web.lists.getByTitle('TestFieldsList').fields.getByTitle('TestNumberField').delete().catch(() => {});
    await sp.web.lists.getByTitle('TestFieldsList').fields.getByTitle('TestTextField').delete().catch(() => {});
    await sp.web.lists.getByTitle('TestFieldsList').fields.getByTitle('TestUrlField').delete().catch(() => {});
    await sp.web.lists.getByTitle('TestFieldsList').fields.getByTitle('TestUserField').delete().catch(() => {});

    // Delete test list
    await sp.web.lists.getByTitle('TestFieldsList').delete().catch(() => {});
  },
};
