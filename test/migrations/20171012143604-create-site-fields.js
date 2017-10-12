module.exports = {
  /**
   * Run these tasks when activating this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  up(engineer) {
    // Boolean field
    engineer.field.create({
      field: {
        FieldTypeKind: 'Boolean',
        Title: 'TestBooleanField',
        Description: '',
        Group: '_Test Site Fields',
        DefaultValue: '0',
      },
    });

    // Choice field
    engineer.field.create({
      field: {
        FieldTypeKind: 'Choice',
        Title: 'TestChoiceField',
        Description: '',
        Group: '_Test Site Fields',
        Choices: [
          'One',
          'Two',
          'Three',
        ],
      },
      choiceRadio: true,
    });

    // Currency field
    engineer.field.create({
      field: {
        FieldTypeKind: 'Currency',
        Title: 'TestCurrencyField',
        Description: '',
        Group: '_Test Site Fields',
        CurrencyLocaleId: 1033,
        MinimumValue: 0,
      },
    });

    // DateTime field
    engineer.field.create({
      field: {
        FieldTypeKind: 'DateTime',
        Title: 'TestDateTimeField',
        Description: '',
        Group: '_Test Site Fields',
        DisplayFormat: 1,
      },
    });

    // Lookup field
    engineer.field.create({
      field: {
        FieldTypeKind: 'Lookup',
        Title: 'TestLookupField',
        LookupListId: 'f67bb7ac-cdc3-4b47-bc5c-8b91e1d8e7c8',
        LookupFieldName: 'Title',
      },
    });

    // MultiChoice field
    engineer.field.create({
      field: {
        FieldTypeKind: 'MultiChoice',
        Title: 'TestMultiChoiceField',
        Description: '',
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
      },
    });

    // MultiLineText field
    engineer.field.create({
      field: {
        FieldTypeKind: 'MultiLineText',
        Title: 'TestMultiLineTextField',
        Description: '',
        Group: '_Test Site Fields',
        NumberOfLines: 8,
      },
    });

    // Number field
    engineer.field.create({
      field: {
        FieldTypeKind: 'Number',
        Title: 'TestNumberField',
        Description: '',
        Group: '_Test Site Fields',
        MinimumValue: 1,
      },
    });

    // Text field
    engineer.field.create({
      field: {
        FieldTypeKind: 'Text',
        Title: 'TestTextField',
        Description: '',
        Group: '_Test Site Fields',
        MaxLength: 10,
      },
    });

    // Url field
    engineer.field.create({
      field: {
        FieldTypeKind: 'Url',
        Title: 'TestUrlField',
        Description: '',
        Group: '_Test Site Fields',
        DisplayFormat: 0,
      },
    });

    // User field
    engineer.field.create({
      field: {
        FieldTypeKind: 'User',
        Title: 'TestUserField',
        Description: '',
        Group: '_Test Site Fields',
        SelectionGroup: 8,
        SelectionMode: 0,
      },
    });

    // Calculated field
    engineer.field.create({
      field: {
        FieldTypeKind: 'Calculated',
        Title: 'TestCalculatedField',
        Description: '',
        Group: '_Test Site Fields',
        Formula: '=[TestNumberField]+10',
        OutputType: 9,
      },
    });
  },

  /**
   * Run these tasks when rolling back this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  down(engineer) {
    // Delete site fields
    engineer.field.delete('TestCalculatedField');
    engineer.field.delete('TestBooleanField');
    engineer.field.delete('TestChoiceField');
    engineer.field.delete('TestCurrencyField');
    engineer.field.delete('TestDateTimeField');
    engineer.field.delete('TestLookupField');
    engineer.field.delete('TestMultiChoiceField');
    engineer.field.delete('TestMultiLineTextField');
    engineer.field.delete('TestNumberField');
    engineer.field.delete('TestTextField');
    engineer.field.delete('TestUrlField');
    engineer.field.delete('TestUserField');
  },
};
