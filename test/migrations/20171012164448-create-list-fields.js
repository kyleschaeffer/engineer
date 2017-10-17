module.exports = {
  /**
   * Run these tasks when activating this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  up(engineer) {
    // Create list
    engineer.task(pnp => pnp.sp.web.lists.add('TestColumnsList', 'A test list to run field operations', 100, true));

    // Boolean
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.add('TestBooleanField', 'SP.Field', {
      FieldTypeKind: 8,
      Description: 'A test Boolean field',
      Group: '_Test List Fields',
      DefaultValue: '0',
    }));

    // Choice
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.add('TestChoiceField', 'SP.FieldChoice', {
      FieldTypeKind: 6,
      Description: 'A test Choice field',
      Group: '_Test List Fields',
      Choices: {
        __metadata: {
          type: 'Collection(Edm.String)',
        },
        results: [
          'One',
          'Two',
          'Three',
        ],
      },
    }));

    // Currency
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.addCurrency('TestCurrencyField', 0, undefined, 1033, {
      Description: 'A test Currency field',
      Group: '_Test List Fields',
    }));

    // DateTime
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.addDateTime('TestDateTimeField', 1, 1, 0, {
      Description: 'A test DateTime field',
      Group: '_Test List Fields',
    }));

    // Lookup
    // engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.createFieldAsXml(`
    //   <Field
    //     Type="Lookup"
    //     Name="TestListLookupField"
    //     StaticName="TestListLookupField"
    //     DisplayName="TestListLookupField"
    //     Description="A test Lookup field"
    //     Group="_Test List Fields"
    //     List="Lists/Pages"
    //     ShowField="Title"
    //     Required="FALSE"
    //     SourceID="http://schemas.microsoft.com/sharepoint/v3">
    //   </Field>
    // `));

    // MultiChoice
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.add('TestMultiChoiceField', 'SP.FieldMultiChoice', {
      FieldTypeKind: 15,
      Description: 'A test MultiChoice field',
      Group: '_Test List Fields',
      Choices: {
        __metadata: {
          type: 'Collection(Edm.String)',
        },
        results: [
          'One',
          'Two',
          'Three',
          'Four',
          'Five',
        ],
      },
      FillInChoice: true,
      DefaultValue: 'One',
    }));

    // MultiLineText
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.addMultilineText('TestMultiLineTextField', 8, false, false, false, true, {
      Description: 'A test MultiLineText field',
      Group: '_Test List Fields',
    }));

    // Number
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.addNumber('TestNumberField', 1, undefined, {
      Description: 'A test Number field',
      Group: '_Test List Fields',
    }));

    // Text
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.addText('TestTextField', 255, {
      Description: 'A test Text field',
      Group: '_Test List Fields',
    }));

    // Url
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.addUrl('TestUrlField', 0, {
      Description: 'A test Url field',
      Group: '_Test List Fields',
    }));

    // User
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.add('TestUserField', 'SP.FieldUser', {
      FieldTypeKind: 20,
      Description: 'A test User field',
      Group: '_Test List Fields',
      SelectionGroup: 8,
      SelectionMode: 0,
    }));

    // Calculated field
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.addCalculated('TestCalculatedField', '=[TestNumberField]+10', undefined, 9, {
      Description: 'A test Calculated field',
      Group: '_Test List Fields',
    }));
  },

  /**
   * Run these tasks when rolling back this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  down(engineer) {
    // Delete list fields
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestCalculatedField').delete());
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestBooleanField').delete());
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestChoiceField').delete());
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestCurrencyField').delete());
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestDateTimeField').delete());
    // engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestLookupField').delete());
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestMultiChoiceField').delete());
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestMultiLineTextField').delete());
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestNumberField').delete());
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestTextField').delete());
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestUrlField').delete());
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestUserField').delete());

    // Delete list
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').delete());
  },
};
