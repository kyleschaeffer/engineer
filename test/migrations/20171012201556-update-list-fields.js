module.exports = {
  /**
   * Run these tasks when activating this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  up(engineer) {
    // Boolean
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestBooleanField').update({
      Description: 'Adding this test description',
    });

    // Choice
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestChoiceField').update({
      Description: 'Adding this test description',
    });

    // Currency
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestCurrencyField').update({
      Description: 'Adding this test description',
    });

    // DateTime
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestDateTimeField').update({
      Description: 'Adding this test description',
    });

    // Lookup
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestLookupField').update({
      Description: 'Adding this test description',
    });

    // MultiChoice
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestMultiChoiceField').update({
      Description: 'Adding this test description',
    });

    // MultiLineText
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestMultiLineTextField').update({
      Description: 'Adding this test description',
    });

    // Number
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestNumberField').update({
      Description: 'Adding this test description',
    });

    // Text
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestTextField').update({
      Description: 'Adding this test description',
    });

    // Url
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestUrlField').update({
      Description: 'Adding this test description',
    });

    // User
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestUserField').update({
      Description: 'Adding this test description',
    });

    // Calculated
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestCalculatedField').update({
      Description: 'Adding this test description',
    });
  },

  /**
   * Run these tasks when rolling back this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  down(engineer) {
    // Boolean
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestBooleanField').update({
      Description: 'A test Boolean field',
    });

    // Choice
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestChoiceField').update({
      Description: 'A test Choice field',
    });

    // Currency
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestCurrencyField').update({
      Description: 'A test Currency field',
    });

    // DateTime
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestDateTimeField').update({
      Description: 'A test DateTime field',
    });

    // Lookup
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestLookupField').update({
      Description: 'A test Lookup field',
    });

    // MultiChoice
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestMultiChoiceField').update({
      Description: 'A test MultiChoice field',
    });

    // MultiLineText
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestMultiLineTextField').update({
      Description: 'A test MultiLineText field',
    });

    // Number
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestNumberField').update({
      Description: 'A test Number field',
    });

    // Text
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestTextField').update({
      Description: 'A test Text field',
    });

    // Url
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestUrlField').update({
      Description: 'A test Url field',
    });

    // User
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestUserField').update({
      Description: 'A test User field',
    });

    // Calculated
    engineer.web.lists.getByTitle('TestColumnsList').fields.getByTitle('TestCalculatedField').update({
      Description: 'A test Calculated field',
    });
  },
};
