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
    // Update Fields
    await sp.web.fields.getByTitle('TestBooleanField').update({ Description: 'Updated' }, 'SP.Field').catch(() => {});
    await sp.web.fields.getByTitle('TestCalculatedField').update({ Description: 'Updated' }, 'SP.FieldCalculated').catch(() => {});
    await sp.web.fields.getByTitle('TestChoiceField').update({ Description: 'Updated' }, 'SP.FieldChoice').catch(() => {});
    await sp.web.fields.getByTitle('TestCurrencyField').update({ Description: 'Updated' }, 'SP.FieldCurrency').catch(() => {});
    await sp.web.fields.getByTitle('TestDateTimeField').update({ Description: 'Updated' }, 'SP.FieldDateTime').catch(() => {});
    await sp.web.fields.getByTitle('TestLookupField').update({ Description: 'Updated' }, 'SP.FieldLookup').catch(() => {});
    await sp.web.fields.getByTitle('TestMultiChoiceField').update({ Description: 'Updated' }, 'SP.FieldMultiChoice').catch(() => {});
    await sp.web.fields.getByTitle('TestMultiLineText').update({ Description: 'Updated' }, 'SP.FieldMultiLineText').catch(() => {});
    await sp.web.fields.getByTitle('TestNumberField').update({ Description: 'Updated' }, 'SP.FieldNumber').catch(() => {});
    await sp.web.fields.getByTitle('TestTextField').update({ Description: 'Updated' }, 'SP.FieldText').catch(() => {});
    await sp.web.fields.getByTitle('TestUrlField').update({ Description: 'Updated' }, 'SP.FieldUrl').catch(() => {});
    await sp.web.fields.getByTitle('TestUserField').update({ Description: 'Updated' }, 'SP.FieldUser').catch(() => {});
  },

  /**
   * Executed on migration deactivation/rollback
   *
   * @param sp SharePoint REST API
   *  - https://github.com/pnp/pnpjs/blob/dev/packages/sp/docs/index.md
   */
  async down(sp) {
    // Undo update
    await sp.web.fields.getByTitle('TestBooleanField').update({ Description: 'Test field' }, 'SP.Field').catch(() => {});
    await sp.web.fields.getByTitle('TestCalculatedField').update({ Description: 'Test field' }, 'SP.FieldCalculated').catch(() => {});
    await sp.web.fields.getByTitle('TestChoiceField').update({ Description: 'Test field' }, 'SP.FieldChoice').catch(() => {});
    await sp.web.fields.getByTitle('TestCurrencyField').update({ Description: 'Test field' }, 'SP.FieldCurrency').catch(() => {});
    await sp.web.fields.getByTitle('TestDateTimeField').update({ Description: 'Test field' }, 'SP.FieldDateTime').catch(() => {});
    await sp.web.fields.getByTitle('TestLookupField').update({ Description: 'Test field' }, 'SP.FieldLookup').catch(() => {});
    await sp.web.fields.getByTitle('TestMultiChoiceField').update({ Description: 'Test field' }, 'SP.FieldMultiChoice').catch(() => {});
    await sp.web.fields.getByTitle('TestMultiLineText').update({ Description: 'Test field' }, 'SP.FieldMultiLineText').catch(() => {});
    await sp.web.fields.getByTitle('TestNumberField').update({ Description: 'Test field' }, 'SP.FieldNumber').catch(() => {});
    await sp.web.fields.getByTitle('TestTextField').update({ Description: 'Test field' }, 'SP.FieldText').catch(() => {});
    await sp.web.fields.getByTitle('TestUrlField').update({ Description: 'Test field' }, 'SP.FieldUrl').catch(() => {});
    await sp.web.fields.getByTitle('TestUserField').update({ Description: 'Test field' }, 'SP.FieldUser').catch(() => {});
  },
};
