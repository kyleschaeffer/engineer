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
    });

    // Currency field
    engineer.field.update({
      title: 'TestCurrencyField',
      field: {
        Description: 'Adding this test description',
        FieldTypeKind: 'Currency',
        MinimumValue: 1,
      },
    });

    // DateTime field
    engineer.field.update({
      title: 'TestDateTimeField',
      field: {
        FieldTypeKind: 'DateTime',
        DisplayFormat: 0,
        Description: 'Adding this test description',
      },
    });

    // Lookup field
    engineer.field.update({
      title: 'TestLookupField',
      field: {
        FieldTypeKind: 'Lookup',
        AllowMultipleValues: true,
        Description: 'Adding this test description',
      },
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
    });

    // MultiLineText field
    engineer.field.update({
      title: 'TestMultiLineTextField',
      field: {
        FieldTypeKind: 'MultiLineText',
        NumberOfLines: 12,
        Description: 'Adding this test description',
      },
    });

    // Number field
    engineer.field.update({
      title: 'TestNumberField',
      field: {
        FieldTypeKind: 'Number',
        MinimumValue: 0,
        Description: 'Adding this test description',
      },
    });

    // Text field
    engineer.field.update({
      title: 'TestTextField',
      field: {
        FieldTypeKind: 'Text',
        MaxLength: 255,
        Description: 'Adding this test description',
      },
    });

    // Url field
    engineer.field.update({
      title: 'TestUrlField',
      field: {
        FieldTypeKind: 'Url',
        DisplayFormat: 1,
        Description: 'Adding this test description',
      },
    });

    // User field
    engineer.field.update({
      title: 'TestUserField',
      field: {
        FieldTypeKind: 'User',
        SelectionGroup: 6,
        Description: 'Adding this test description',
      },
    });

    // Calculated field
    engineer.field.update({
      title: 'TestCalculatedField',
      field: {
        FieldTypeKind: 'Calculated',
        Formula: '=[TestNumberField]+30',
        Description: 'Adding this test description',
      },
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
    });

    // Currency field
    engineer.field.update({
      title: 'TestCurrencyField',
      field: {
        FieldTypeKind: 'Currency',
        MinimumValue: 0,
        Description: '',
      },
    });

    // DateTime field
    engineer.field.update({
      title: 'TestDateTimeField',
      field: {
        FieldTypeKind: 'DateTime',
        DisplayFormat: 1,
        Description: '',
      },
    });

    // Lookup field
    engineer.field.update({
      title: 'TestLookupField',
      field: {
        FieldTypeKind: 'Lookup',
        AllowMultipleValues: false,
        Description: '',
      },
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
    });

    // MultiLineText field
    engineer.field.update({
      title: 'TestMultiLineTextField',
      field: {
        FieldTypeKind: 'MultiLineText',
        NumberOfLines: 8,
        Description: '',
      },
    });

    // Number field
    engineer.field.update({
      title: 'TestNumberField',
      field: {
        FieldTypeKind: 'Number',
        MinimumValue: 1,
        Description: '',
      },
    });

    // Text field
    engineer.field.update({
      title: 'TestTextField',
      field: {
        FieldTypeKind: 'Text',
        MaxLength: 10,
        Description: '',
      },
    });

    // Url field
    engineer.field.update({
      title: 'TestUrlField',
      field: {
        FieldTypeKind: 'Url',
        DisplayFormat: 0,
        Description: '',
      },
    });

    // User field
    engineer.field.update({
      title: 'TestUserField',
      field: {
        FieldTypeKind: 'User',
        SelectionGroup: 8,
        Description: '',
      },
    });

    // Calculated field
    engineer.field.update({
      title: 'TestCalculatedField',
      field: {
        FieldTypeKind: 'Calculated',
        Formula: '=[TestNumberField]+10',
        Description: '',
      },
    });
  },
};
