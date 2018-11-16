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
    // TO DO: Update test to incorporate @pnp/sp-taxonomy for dynamic store/set ID's
    const termStoreId = '830a74b8-ed84-4d45-86aa-91502359bc10';
    const termSetId = 'ff79f618-1092-461e-be79-4fc76c557071';

    // Create associated Note field for TaxonomyFieldType field
    await sp.web.fields.createFieldAsXml(`
      <Field
        ID="{03d84ed2-16d9-eb48-c553-f9eac9b348a1}"
        Type="Note"
        Name="TestTaxonomyFieldTaxHTField0"
        StaticName="TestTaxonomyFieldTaxHTField0"
        DisplayName="TestTaxonomyField Tags_0"
        Group="_Test Fields"
        Description="Test field"
        Required="FALSE"
        Hidden="TRUE"
        CanToggleHidden="TRUE"
        SourceID="http://schemas.microsoft.com/sharepoint/v3">
      </Field>
    `).catch(() => {});

    // Create TaxonomyFieldType field (references associated Note field ID above)
    await sp.web.fields.createFieldAsXml(`
      <Field
        ID="{3ecd32b9-0f23-0004-2fbc-96c117d8326a}"
        Type="TaxonomyFieldType"
        Name="TestTaxonomyField"
        StaticName="TestTaxonomyField"
        DisplayName="TestTaxonomyField"
        Group="_Test Fields"
        Description="Test field"
        Mult="FALSE"
        Sortable="FALSE"
        ShowField="Term1033"
        Required="FALSE"
        SourceID="http://schemas.microsoft.com/sharepoint/v3">
        <Customization>
          <ArrayOfProperty>
            <Property>
              <Name>TextField</Name>
              <Value
                xmlns:q6="http://www.w3.org/2001/XMLSchema"
                p4:type="q6:string"
                xmlns:p4="http://www.w3.org/2001/XMLSchema-instance">03d84ed2-16d9-eb48-c553-f9eac9b348a1</Value>
            </Property>
            <Property>
              <Name>SspId</Name>
              <Value
                xmlns:q1="http://www.w3.org/2001/XMLSchema"
                p4:type="q1:string"
                xmlns:p4="http://www.w3.org/2001/XMLSchema-instance">${termStoreId}</Value>
            </Property>
            <Property>
              <Name>TermSetId</Name>
              <Value
                xmlns:q2="http://www.w3.org/2001/XMLSchema"
                p4:type="q2:string"
                xmlns:p4="http://www.w3.org/2001/XMLSchema-instance">${termSetId}</Value>
            </Property>
          </ArrayOfProperty>
        </Customization>
      </Field>
    `).catch(() => {});

    // Create associated Note field for TaxonomyFieldTypeMulti field
    await sp.web.fields.createFieldAsXml(`
      <Field
        ID="{8535ae4c-dbc4-aec7-d8eb-d25ea81520d5}"
        Type="Note"
        Name="TestMultiTaxonomyFieldTaxHTField0"
        StaticName="TestMultiTaxonomyFieldTaxHTField0"
        DisplayName="TestMultiTaxonomyField Tags_0"
        Group="_Test Fields"
        Description="Test field"
        Required="FALSE"
        Hidden="TRUE"
        CanToggleHidden="TRUE"
        SourceID="http://schemas.microsoft.com/sharepoint/v3">
      </Field>
    `).catch(() => {});

    // Create TaxonomyFieldTypeMulti field (references associated Note field ID above)
    await sp.web.fields.createFieldAsXml(`
      <Field
        ID="{cdfb2e18-908a-6e90-7969-581dee544225}"
        Type="TaxonomyFieldTypeMulti"
        Name="TestMultiTaxonomyField"
        StaticName="TestMultiTaxonomyField"
        DisplayName="TestMultiTaxonomyField"
        Group="_Test Fields"
        Description="Test field"
        Mult="TRUE"
        Sortable="FALSE"
        ShowField="Term1033"
        Required="FALSE"
        SourceID="http://schemas.microsoft.com/sharepoint/v3">
        <Customization>
          <ArrayOfProperty>
            <Property>
              <Name>TextField</Name>
              <Value
                xmlns:q6="http://www.w3.org/2001/XMLSchema"
                p4:type="q6:string"
                xmlns:p4="http://www.w3.org/2001/XMLSchema-instance">8535ae4c-dbc4-aec7-d8eb-d25ea81520d5</Value>
            </Property>
            <Property>
              <Name>SspId</Name>
              <Value
                xmlns:q1="http://www.w3.org/2001/XMLSchema"
                p4:type="q1:string"
                xmlns:p4="http://www.w3.org/2001/XMLSchema-instance">${termStoreId}</Value>
            </Property>
            <Property>
              <Name>TermSetId</Name>
              <Value
                xmlns:q2="http://www.w3.org/2001/XMLSchema"
                p4:type="q2:string"
                xmlns:p4="http://www.w3.org/2001/XMLSchema-instance">${termSetId}</Value>
            </Property>
          </ArrayOfProperty>
        </Customization>
      </Field>
    `).catch(() => {});
  },

  /**
   * Executed on migration deactivation/rollback
   *
   * @param sp SharePoint REST API
   *  - https://github.com/pnp/pnpjs/blob/dev/packages/sp/docs/index.md
   */
  async down(sp) {
    // Delete fields
    await sp.web.fields.getByTitle('TestTaxonomyField').delete().catch(() => {});
    await sp.web.fields.getByTitle('TestTaxonomyField Tags_0').delete().catch(() => {});
    await sp.web.fields.getByTitle('TestMultiTaxonomyField').delete().catch(() => {});
    await sp.web.fields.getByTitle('TestMultiTaxonomyField Tags_0').delete().catch(() => {});
  },
};
