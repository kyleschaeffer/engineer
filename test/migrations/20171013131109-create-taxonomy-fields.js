module.exports = {
  /**
   * Run these tasks when activating this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  up(engineer) {
    /**
     * Unfortunately there is no REST API for managed metadata/taxonomy. For
     * now, we'll have to hard-code the term store and term set IDs right here.
     * It would be great to add a taxonomy configuration service to Engineer to
     * be able to retrieve and write to the managed metadata service. Please,
     * vote up this request on UserVoice to let Microsoft know this API endpoint
     * is badly needed:
     * https://sharepoint.uservoice.com/forums/329220-sharepoint-dev-platform/suggestions/14691270-add-managed-metadata-term-store-operations-to-rest
     */
    const termStoreId = '830a74b8-ed84-4d45-86aa-91502359bc10';
    const termSetId = 'ff79f618-1092-461e-be79-4fc76c557071';

    // Create associated Note field for TaxonomyFieldType field
    engineer.field.fromSchema(`
      <Field
        ID="{03d84ed2-16d9-eb48-c553-f9eac9b348a1}"
        Type="Note"
        Name="TestTaxonomyFieldTaxHTField0"
        StaticName="TestTaxonomyFieldTaxHTField0"
        DisplayName="TestTaxonomyField Tags_0"
        Group="_Test Site Fields"
        Description=""
        Required="FALSE"
        Hidden="TRUE"
        CanToggleHidden="TRUE"
        SourceID="http://schemas.microsoft.com/sharepoint/v3">
      </Field>
    `);

    // Create TaxonomyFieldType field (references associated Note field ID above)
    engineer.field.fromSchema(`
      <Field
        ID="{3ecd32b9-0f23-0004-2fbc-96c117d8326a}"
        Type="TaxonomyFieldType"
        Name="TestTaxonomyField"
        StaticName="TestTaxonomyField"
        DisplayName="TestTaxonomyField"
        Group="_Test Site Fields"
        Description=""
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
    `);

    // Create associated Note field for TaxonomyFieldTypeMulti field
    engineer.field.fromSchema(`
      <Field
        ID="{8535ae4c-dbc4-aec7-d8eb-d25ea81520d5}"
        Type="Note"
        Name="TestMultiTaxonomyFieldTaxHTField0"
        StaticName="TestMultiTaxonomyFieldTaxHTField0"
        DisplayName="TestMultiTaxonomyField Tags_0"
        Group="_Test Site Fields"
        Description=""
        Required="FALSE"
        Hidden="TRUE"
        CanToggleHidden="TRUE"
        SourceID="http://schemas.microsoft.com/sharepoint/v3">
      </Field>
    `);

    // Create TaxonomyFieldTypeMulti field (references associated Note field ID above)
    engineer.field.fromSchema(`
      <Field
        ID="{cdfb2e18-908a-6e90-7969-581dee544225}"
        Type="TaxonomyFieldTypeMulti"
        Name="TestMultiTaxonomyField"
        StaticName="TestMultiTaxonomyField"
        DisplayName="TestMultiTaxonomyField"
        Group="_Test Site Fields"
        Description=""
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
    `);
  },

  /**
   * Run these tasks when rolling back this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  down(engineer) {
    // Delete fields
    engineer.field.delete('TestTaxonomyField');
    engineer.field.delete('TestTaxonomyField Tags_0');
    engineer.field.delete('TestMultiTaxonomyField');
    engineer.field.delete('TestMultiTaxonomyField Tags_0');
  },
};
