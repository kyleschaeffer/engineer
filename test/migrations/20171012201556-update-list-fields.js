module.exports = {
  /**
   * Run these tasks when activating this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  up(engineer) {
    // Boolean
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByInternalNameOrTitle('TestBooleanField').update({
      Description: 'Adding this test description',
    }, 'SP.Field'));

    // Choice
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestChoiceField').update({
      Description: 'Adding this test description',
    }));

    // Currency
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestCurrencyField').update({
      Description: 'Adding this test description',
    }));

    // DateTime
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestDateTimeField').update({
      Description: 'Adding this test description',
    }));

    // Lookup
    // engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestLookupField').update({
    //   Description: 'Adding this test description',
    // }));

    // MultiChoice
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestMultiChoiceField').update({
      Description: 'Adding this test description',
    }));

    // MultiLineText
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestMultiLineTextField').update({
      Description: 'Adding this test description',
    }));

    // Number
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestNumberField').update({
      Description: 'Adding this test description',
    }));

    // Text
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestTextField').update({
      Description: 'Adding this test description',
    }));

    // Url
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestUrlField').update({
      Description: 'Adding this test description',
    }));

    // User
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestUserField').update({
      Description: 'Adding this test description',
    }));

    // Calculated
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestCalculatedField').update({
      Description: 'Adding this test description',
    }));
  },

  /**
   * Run these tasks when rolling back this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  down(engineer) {
    // Boolean
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByInternalNameOrTitle('TestBooleanField').update({
      Description: 'A test Boolean field',
    }, 'SP.Field'));

    // Choice
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestChoiceField').update({
      Description: 'A test Choice field',
    }));

    // Currency
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestCurrencyField').update({
      Description: 'A test Currency field',
    }));

    // DateTime
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestDateTimeField').update({
      Description: 'A test DateTime field',
    }));

    // Lookup
    // engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestLookupField').update({
    //   Description: 'A test Lookup field',
    // }));

    // MultiChoice
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestMultiChoiceField').update({
      Description: 'A test MultiChoice field',
    }));

    // MultiLineText
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestMultiLineTextField').update({
      Description: 'A test MultiLineText field',
    }));

    // Number
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestNumberField').update({
      Description: 'A test Number field',
    }));

    // Text
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestTextField').update({
      Description: 'A test Text field',
    }));

    // Url
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestUrlField').update({
      Description: 'A test Url field',
    }));

    // User
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestUserField').update({
      Description: 'A test User field',
    }));

    // Calculated
    engineer.task(pnp => pnp.sp.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestCalculatedField').update({
      Description: 'A test Calculated field',
    }));
  },
};
