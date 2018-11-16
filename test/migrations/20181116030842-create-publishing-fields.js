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
    // HTML
    await sp.web.fields.createFieldAsXml(`
      <Field
        Type="HTML"
        Name="TestHTMLField"
        StaticName="TestHTMLField"
        DisplayName="TestHTMLField"
        Description="Test field"
        Group="_Test Fields"
        RichText="TRUE"
        RichTextMode="FullHtml"
        Required="FALSE"
        SourceID="http://schemas.microsoft.com/sharepoint/v3">
      </Field>
    `).catch(() => {});

    // Image
    await sp.web.fields.createFieldAsXml(`
      <Field
        Type="Image"
        Name="TestImageField"
        StaticName="TestImageField"
        DisplayName="TestImageField"
        Description="Test field"
        Group="_Test Fields"
        RichText="TRUE"
        RichTextMode="FullHtml"
        Required="FALSE"
        SourceID="http://schemas.microsoft.com/sharepoint/v3">
      </Field>
    `).catch(() => {});

    // Link
    await sp.web.fields.createFieldAsXml(`
      <Field
        Type="Link"
        Name="TestLinkField"
        StaticName="TestLinkField"
        DisplayName="TestLinkField"
        Description="Test field"
        Group="_Test Fields"
        RichText="TRUE"
        RichTextMode="ThemeHtml"
        Required="FALSE"
        SourceID="http://schemas.microsoft.com/sharepoint/v3">
      </Field>
    `).catch(() => {});

    // SummaryLinks
    await sp.web.fields.createFieldAsXml(`
      <Field
        Type="SummaryLinks"
        Name="TestSummaryLinksField"
        StaticName="TestSummaryLinksField"
        DisplayName="TestSummaryLinksField"
        Description="Test field"
        Group="_Test Fields"
        RichText="TRUE"
        RichTextMode="FullHtml"
        Required="FALSE"
        SourceID="http://schemas.microsoft.com/sharepoint/v3">
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
    await sp.web.fields.getByTitle('TestHTMLField').delete().catch(() => {});
    await sp.web.fields.getByTitle('TestImageField').delete().catch(() => {});
    await sp.web.fields.getByTitle('TestLinkField').delete().catch(() => {});
    await sp.web.fields.getByTitle('TestSummaryLinksField').delete().catch(() => {});
  },
};
