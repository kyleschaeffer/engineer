module.exports = {
  /**
   * Run these tasks when activating this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  up(engineer) {
    // Boolean field
    engineer.field.update({
      title: 'TestBooleanField',
      field: {
        DefaultValue: '1',
        Description: 'Adding this test description',
        FieldTypeKind: 'Boolean',
      },
      list: 'TestColumnsList',
    });

    // Choice field
    engineer.field.update({
      title: 'TestChoiceField',
      field: {
        Choices: [
          'One',
          'Two',
          'Three',
          'Four',
        ],
        Description: 'Adding this test description',
        FieldTypeKind: 'Choice',
      },
      choiceRadio: false,
      list: 'TestColumnsList',
    });

    // Currency field
    engineer.field.update({
      title: 'TestCurrencyField',
      field: {
        Description: 'Adding this test description',
        FieldTypeKind: 'Currency',
        MinimumValue: 1,
      },
      list: 'TestColumnsList',
    });

    // DateTime field
    engineer.field.update({
      title: 'TestDateTimeField',
      field: {
        FieldTypeKind: 'DateTime',
        DisplayFormat: 0,
        Description: 'Adding this test description',
      },
      list: 'TestColumnsList',
    });

    // Lookup field
    engineer.field.update({
      title: 'TestLookupField',
      field: {
        FieldTypeKind: 'Lookup',
        AllowMultipleValues: true,
        Description: 'Adding this test description',
      },
      list: 'TestColumnsList',
    });

    // MultiChoice field
    engineer.field.update({
      title: 'TestMultiChoiceField',
      field: {
        FieldTypeKind: 'MultiChoice',
        Choices: [
          'One',
          'Two',
          'Three',
        ],
        FillInChoice: false,
        Description: 'Adding this test description',
      },
      list: 'TestColumnsList',
    });

    // MultiLineText field
    engineer.field.update({
      title: 'TestMultiLineTextField',
      field: {
        FieldTypeKind: 'MultiLineText',
        NumberOfLines: 12,
        Description: 'Adding this test description',
      },
      list: 'TestColumnsList',
    });

    // Number field
    engineer.field.update({
      title: 'TestNumberField',
      field: {
        FieldTypeKind: 'Number',
        MinimumValue: 0,
        Description: 'Adding this test description',
      },
      list: 'TestColumnsList',
    });

    // Text field
    engineer.field.update({
      title: 'TestTextField',
      field: {
        FieldTypeKind: 'Text',
        MaxLength: 255,
        Description: 'Adding this test description',
      },
      list: 'TestColumnsList',
    });

    // Url field
    engineer.field.update({
      title: 'TestUrlField',
      field: {
        FieldTypeKind: 'Url',
        DisplayFormat: 1,
        Description: 'Adding this test description',
      },
      list: 'TestColumnsList',
    });

    // User field
    engineer.field.update({
      title: 'TestUserField',
      field: {
        FieldTypeKind: 'User',
        SelectionGroup: 6,
        Description: 'Adding this test description',
      },
      list: 'TestColumnsList',
    });

    // Calculated field
    engineer.field.update({
      title: 'TestCalculatedField',
      field: {
        FieldTypeKind: 'Calculated',
        Formula: '=[TestNumberField]+30',
        Description: 'Adding this test description',
      },
      list: 'TestColumnsList',
    });
  },

  /**
   * Run these tasks when rolling back this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  down(engineer) {
    // Boolean field
    engineer.field.update({
      title: 'TestBooleanField',
      field: {
        DefaultValue: '0',
        Description: '',
        FieldTypeKind: 'Boolean',
      },
      list: 'TestColumnsList',
    });

    // Choice field
    engineer.field.update({
      title: 'TestChoiceField',
      field: {
        Choices: [
          'One',
          'Two',
          'Three',
        ],
        Description: '',
        FieldTypeKind: 'Choice',
      },
      choiceRadio: true,
      list: 'TestColumnsList',
    });

    // Currency field
    engineer.field.update({
      title: 'TestCurrencyField',
      field: {
        FieldTypeKind: 'Currency',
        MinimumValue: 0,
        Description: '',
      },
      list: 'TestColumnsList',
    });

    // DateTime field
    engineer.field.update({
      title: 'TestDateTimeField',
      field: {
        FieldTypeKind: 'DateTime',
        DisplayFormat: 1,
        Description: '',
      },
      list: 'TestColumnsList',
    });

    // Lookup field
    engineer.field.update({
      title: 'TestLookupField',
      field: {
        FieldTypeKind: 'Lookup',
        AllowMultipleValues: false,
        Description: '',
      },
      list: 'TestColumnsList',
    });

    // MultiChoice field
    engineer.field.update({
      title: 'TestMultiChoiceField',
      field: {
        FieldTypeKind: 'MultiChoice',
        Choices: [
          'One',
          'Two',
          'Three',
          'Four',
          'Five',
        ],
        FillInChoice: true,
        Description: '',
      },
      list: 'TestColumnsList',
    });

    // MultiLineText field
    engineer.field.update({
      title: 'TestMultiLineTextField',
      field: {
        FieldTypeKind: 'MultiLineText',
        NumberOfLines: 8,
        Description: '',
      },
      list: 'TestColumnsList',
    });

    // Number field
    engineer.field.update({
      title: 'TestNumberField',
      field: {
        FieldTypeKind: 'Number',
        MinimumValue: 1,
        Description: '',
      },
      list: 'TestColumnsList',
    });

    // Text field
    engineer.field.update({
      title: 'TestTextField',
      field: {
        FieldTypeKind: 'Text',
        MaxLength: 10,
        Description: '',
      },
      list: 'TestColumnsList',
    });

    // Url field
    engineer.field.update({
      title: 'TestUrlField',
      field: {
        FieldTypeKind: 'Url',
        DisplayFormat: 0,
        Description: '',
      },
      list: 'TestColumnsList',
    });

    // User field
    engineer.field.update({
      title: 'TestUserField',
      field: {
        FieldTypeKind: 'User',
        SelectionGroup: 8,
        Description: '',
      },
      list: 'TestColumnsList',
    });

    // Calculated field
    engineer.field.update({
      title: 'TestCalculatedField',
      field: {
        FieldTypeKind: 'Calculated',
        Formula: '=[TestNumberField]+10',
        Description: '',
      },
      list: 'TestColumnsList',
    });
  },
};
