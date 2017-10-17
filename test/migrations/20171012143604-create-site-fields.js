module.exports = {
  /**
   * Run these tasks when activating this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  up(engineer) {
    // Boolean
    engineer.task(pnp => pnp.sp.web.fields.add('TestBooleanField', 'SP.Field', {
      FieldTypeKind: 8,
      Description: 'A test Boolean field',
      Group: '_Test Site Fields',
      DefaultValue: '0',
    }));

    // Choice
    engineer.task(pnp => pnp.sp.web.fields.add('TestChoiceField', 'SP.FieldChoice', {
      FieldTypeKind: 6,
      Description: 'A test Choice field',
      Group: '_Test Site Fields',
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
    engineer.task(pnp => pnp.sp.web.fields.addCurrency('TestCurrencyField', 0, undefined, 1033, {
      Description: 'A test Currency field',
      Group: '_Test Site Fields',
    }));

    // DateTime
    engineer.task(pnp => pnp.sp.web.fields.addDateTime('TestDateTimeField', 1, 1, 0, {
      Description: 'A test DateTime field',
      Group: '_Test Site Fields',
    }));

    // Lookup
    engineer.task(pnp => pnp.sp.web.fields.createFieldAsXml(`
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
    `));

    // MultiChoice
    engineer.task(pnp => pnp.sp.web.fields.add('TestMultiChoiceField', 'SP.FieldMultiChoice', {
      FieldTypeKind: 15,
      Description: 'A test MultiChoice field',
      Group: '_Test Site Fields',
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
    engineer.task(pnp => pnp.sp.web.fields.addMultilineText('TestMultiLineTextField', 8, false, false, false, true, {
      Description: 'A test MultiLineText field',
      Group: '_Test Site Fields',
    }));

    // Number
    engineer.task(pnp => pnp.sp.web.fields.addNumber('TestNumberField', 1, undefined, {
      Description: 'A test Number field',
      Group: '_Test Site Fields',
    }));

    // Text
    engineer.task(pnp => pnp.sp.web.fields.addText('TestTextField', 255, {
      Description: 'A test Text field',
      Group: '_Test Site Fields',
    }));

    // Url
    engineer.task(pnp => pnp.sp.web.fields.addUrl('TestUrlField', 0, {
      Description: 'A test Url field',
      Group: '_Test Site Fields',
    }));

    // User
    engineer.task(pnp => pnp.sp.web.fields.add('TestUserField', 'SP.FieldUser', {
      FieldTypeKind: 20,
      Description: 'A test User field',
      Group: '_Test Site Fields',
      SelectionGroup: 8,
      SelectionMode: 0,
    }));

    // Calculated field
    engineer.task(pnp => pnp.sp.web.fields.addCalculated('TestCalculatedField', '=[TestNumberField]+10', undefined, 9, {
      Description: 'A test Calculated field',
      Group: '_Test Site Fields',
    }));
  },

  /**
   * Run these tasks when rolling back this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  down(engineer) {
    // Delete site fields
    engineer.task(pnp => pnp.sp.web.fields.getByTitle('TestCalculatedField').delete());
    engineer.task(pnp => pnp.sp.web.fields.getByTitle('TestBooleanField').delete());
    engineer.task(pnp => pnp.sp.web.fields.getByTitle('TestChoiceField').delete());
    engineer.task(pnp => pnp.sp.web.fields.getByTitle('TestCurrencyField').delete());
    engineer.task(pnp => pnp.sp.web.fields.getByTitle('TestDateTimeField').delete());
    engineer.task(pnp => pnp.sp.web.fields.getByTitle('TestLookupField').delete());
    engineer.task(pnp => pnp.sp.web.fields.getByTitle('TestMultiChoiceField').delete());
    engineer.task(pnp => pnp.sp.web.fields.getByTitle('TestMultiLineTextField').delete());
    engineer.task(pnp => pnp.sp.web.fields.getByTitle('TestNumberField').delete());
    engineer.task(pnp => pnp.sp.web.fields.getByTitle('TestTextField').delete());
    engineer.task(pnp => pnp.sp.web.fields.getByTitle('TestUrlField').delete());
    engineer.task(pnp => pnp.sp.web.fields.getByTitle('TestUserField').delete());
  },
};
