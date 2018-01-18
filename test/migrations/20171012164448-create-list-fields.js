module.exports = {
  /**
   * Run these tasks when activating this migration. See
   * https://github.com/sprtus/engineer for more information on
   * Engineer tasks.
   */
  up(engineer) {
    // Create list
    engineer.web.lists.add({
      Title: 'TestColumnsList',
      Description: 'A test list to run field operations',
      BaseTemplate: 100,
      ContentTypesEnabled: true,
    });

    // Boolean
    engineer.web.lists.getByTitle('TestColumnsList').fields.add({
      Type: 'Boolean',
      Title: 'TestBooleanField',
      Description: 'A test Boolean field',
      Group: '_Test Site Fields',
      DefaultValue: '0',
    });

    // Choice
    engineer.web.lists.getByTitle('TestColumnsList').fields.add({
      Type: 'Choice',
      Title: 'TestChoiceField',
      Description: 'A test Choice field',
      Group: '_Test Site Fields',
      Choices: [
        'One',
        'Two',
        'Three',
      ],
    });

    // Currency
    engineer.web.lists.getByTitle('TestColumnsList').fields.add({
      Type: 'Currency',
      Title: 'TestCurrencyField',
      Description: 'A test Currency field',
      Group: '_Test Site Fields',
      CurrencyLocaleId: 1033,
      MinimumValue: 0,
      MaximumValue: 100,
    });

    // DateTime
    engineer.web.lists.getByTitle('TestColumnsList').fields.add({
      Type: 'DateTime',
      Title: 'TestDateTimeField',
      Description: 'A test DateTime field',
      Group: '_Test Site Fields',
      DisplayFormat: 1,
      DateTimeCalendarType: 1,
      FriendlyDisplayFormat: 0,
    });

    // Lookup
    engineer.web.lists.getByTitle('TestColumnsList').fields.addXml(`
      <Field
        Type="Lookup"
        Name="TestLookupField"
        StaticName="TestLookupField"
        DisplayName="TestLookupField"
        Description="A test Lookup field"
        Group="_Test Site Fields"
        List="Lists/Pages"
        ShowField="Title"
        Required="FALSE"
        SourceID="http://schemas.microsoft.com/sharepoint/v3">
      </Field>
    `);

    // MultiChoice
    engineer.web.lists.getByTitle('TestColumnsList').fields.add({
      Type: 'MultiChoice',
      Title: 'TestMultiChoiceField',
      Description: 'A test MultiChoice field',
      Group: '_Test Site Fields',
      Choices: [
        'One',
        'Two',
        'Three',
        'Four',
        'Five',
      ],
      FillInChoice: true,
      DefaultValue: 'One',
    });

    // MultiLineText
    engineer.web.lists.getByTitle('TestColumnsList').fields.add({
      Type: 'MultiLineText',
      Title: 'TestMultiLineTextField',
      Description: 'A test MultiLineText field',
      Group: '_Test Site Fields',
      NumberOfLines: 8,
      RichText: true,
      AllowHyperlink: true,
      RestrictedMode: false,
      AppendOnly: false,
    });

    // Number
    engineer.web.lists.getByTitle('TestColumnsList').fields.add({
      Type: 'Number',
      Title: 'TestNumberField',
      Description: 'A test Number field',
      Group: '_Test Site Fields',
      MinimumValue: 0,
      MaximumValue: 100,
    });

    // Text
    engineer.web.lists.getByTitle('TestColumnsList').fields.add({
      Type: 'Text',
      Title: 'TestTextField',
      Description: 'A test Text field',
      Group: '_Test Site Fields',
      MaxLength: 255,
    });

    // Url
    engineer.web.lists.getByTitle('TestColumnsList').fields.add({
      Type: 'Url',
      Title: 'TestUrlField',
      Description: 'A test Url field',
      Group: '_Test Site Fields',
      DisplayFormat: 1,
    });

    // User
    engineer.web.lists.getByTitle('TestColumnsList').fields.add({
      Type: 'User',
      Title: 'TestUserField',
      Description: 'A test User field',
      Group: '_Test Site Fields',
      SelectionGroup: 8,
      SelectionMode: 0,
    });

    // Calculated field
    engineer.web.lists.getByTitle('TestColumnsList').fields.add({
      Type: 'Calculated',
      Title: 'TestCalculatedField',
      Description: 'A test Calculated field',
      Group: '_Test Site Fields',
      Formula: '=[TestNumberField]+10',
      OutputType: 'Number',
    });
  },

  /**
   * Run these tasks when rolling back this migration. See
   * https://github.com/sprtus/engineer for more information on
   * Engineer tasks.
   */
  down(engineer) {
    // Delete list fields
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestCalculatedField').delete();
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestBooleanField').delete();
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestChoiceField').delete();
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestCurrencyField').delete();
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestDateTimeField').delete();
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestLookupField').delete();
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestMultiChoiceField').delete();
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestMultiLineTextField').delete();
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestNumberField').delete();
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestTextField').delete();
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestUrlField').delete();
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestUserField').delete();

    // Delete list
    engineer.web.lists.getByTitle('TestColumnsList').delete();
  },
};
