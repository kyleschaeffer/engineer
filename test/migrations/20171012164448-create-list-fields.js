module.exports = {
  /**
   * Run these tasks when activating this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  up(engineer) {
    // Create list
    engineer.list.create('TestColumnsList');

    // Boolean field
    engineer.field.create({
      field: {
        Title: 'TestBooleanField',
        Description: '',
        FieldTypeKind: 'Boolean',
        DefaultValue: '0',
      },
      list: 'TestColumnsList',
    });

    // Choice field
    engineer.field.create({
      field: {
        Title: 'TestChoiceField',
        Description: '',
        FieldTypeKind: 'Choice',
        Choices: [
          'One',
          'Two',
          'Three',
        ],
      },
      choiceRadio: true,
      list: 'TestColumnsList',
    });

    // Currency field
    engineer.field.create({
      field: {
        Title: 'TestCurrencyField',
        Description: '',
        FieldTypeKind: 'Currency',
        CurrencyLocaleId: 1033,
        MinimumValue: 0,
      },
      list: 'TestColumnsList',
    });

    // DateTime field
    engineer.field.create({
      field: {
        Title: 'TestDateTimeField',
        Description: '',
        FieldTypeKind: 'DateTime',
        DisplayFormat: 1,
      },
      list: 'TestColumnsList',
    });

    // Lookup field
    engineer.field.create({
      field: {
        Title: 'TestLookupField',
        FieldTypeKind: 'Lookup',
        LookupListId: 'f67bb7ac-cdc3-4b47-bc5c-8b91e1d8e7c8',
        LookupFieldName: 'Title',
      },
      list: 'TestColumnsList',
    });

    // MultiChoice field
    engineer.field.create({
      field: {
        Title: 'TestMultiChoiceField',
        Description: '',
        FieldTypeKind: 'MultiChoice',
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
      list: 'TestColumnsList',
    });

    // MultiLineText field
    engineer.field.create({
      field: {
        Title: 'TestMultiLineTextField',
        Description: '',
        FieldTypeKind: 'MultiLineText',
        NumberOfLines: 8,
      },
      list: 'TestColumnsList',
    });

    // Number field
    engineer.field.create({
      field: {
        Title: 'TestNumberField',
        Description: '',
        FieldTypeKind: 'Number',
        MinimumValue: 1,
      },
      list: 'TestColumnsList',
    });

    // Text field
    engineer.field.create({
      field: {
        Title: 'TestTextField',
        Description: '',
        FieldTypeKind: 'Text',
        MaxLength: 10,
      },
      list: 'TestColumnsList',
    });

    // Url field
    engineer.field.create({
      field: {
        Title: 'TestUrlField',
        Description: '',
        FieldTypeKind: 'Url',
        DisplayFormat: 0,
      },
      list: 'TestColumnsList',
    });

    // User field
    engineer.field.create({
      field: {
        Title: 'TestUserField',
        Description: '',
        FieldTypeKind: 'User',
        SelectionGroup: 8,
        SelectionMode: 0,
      },
      list: 'TestColumnsList',
    });

    // Calculated field
    engineer.field.create({
      field: {
        Title: 'TestCalculatedField',
        Description: '',
        FieldTypeKind: 'Calculated',
        Formula: '=[TestNumberField]+10',
        OutputType: 9,
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
    // Delete list fields
    engineer.field.delete({ title: 'TestCalculatedField', list: 'TestColumnsList' });
    engineer.field.delete({ title: 'TestBooleanField', list: 'TestColumnsList' });
    engineer.field.delete({ title: 'TestChoiceField', list: 'TestColumnsList' });
    engineer.field.delete({ title: 'TestCurrencyField', list: 'TestColumnsList' });
    engineer.field.delete({ title: 'TestDateTimeField', list: 'TestColumnsList' });
    engineer.field.delete({ title: 'TestLookupField', list: 'TestColumnsList' });
    engineer.field.delete({ title: 'TestMultiChoiceField', list: 'TestColumnsList' });
    engineer.field.delete({ title: 'TestMultiLineTextField', list: 'TestColumnsList' });
    engineer.field.delete({ title: 'TestNumberField', list: 'TestColumnsList' });
    engineer.field.delete({ title: 'TestTextField', list: 'TestColumnsList' });
    engineer.field.delete({ title: 'TestUrlField', list: 'TestColumnsList' });
    engineer.field.delete({ title: 'TestUserField', list: 'TestColumnsList' });

    // Delete list
    engineer.list.delete('TestColumnsList');
  },
};
