module.exports = {
  /**
   * Run these tasks when activating this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  up(engineer) {
    // HTML field
    engineer.task(pnp => pnp.sp.web.fields.createFieldAsXml(`
      <Field
        Type="HTML"
        Name="TestHTMLField"
        StaticName="TestHTMLField"
        DisplayName="TestHTMLField"
        Description="A test HTML field"
        Group="_Test Site Fields"
        RichText="TRUE"
        RichTextMode="FullHtml"
        Required="FALSE"
        SourceID="http://schemas.microsoft.com/sharepoint/v3">
      </Field>
    `));

    // Image field
    engineer.task(pnp => pnp.sp.web.fields.createFieldAsXml(`
      <Field
        Type="Image"
        Name="TestImageField"
        StaticName="TestImageField"
        DisplayName="TestImageField"
        Description="A test Image field"
        Group="_Test Site Fields"
        RichText="TRUE"
        RichTextMode="FullHtml"
        Required="FALSE"
        SourceID="http://schemas.microsoft.com/sharepoint/v3">
      </Field>
    `));

    // Link field
    engineer.task(pnp => pnp.sp.web.fields.createFieldAsXml(`
      <Field
        Type="Link"
        Name="TestLinkField"
        StaticName="TestLinkField"
        DisplayName="TestLinkField"
        Description="A test Link field"
        Group="_Test Site Fields"
        RichText="TRUE"
        RichTextMode="ThemeHtml"
        Required="FALSE"
        SourceID="http://schemas.microsoft.com/sharepoint/v3">
      </Field>
    `));

    // SummaryLinks field
    engineer.task(pnp => pnp.sp.web.fields.createFieldAsXml(`
      <Field
        Type="SummaryLinks"
        Name="TestSummaryLinksField"
        StaticName="TestSummaryLinksField"
        DisplayName="TestSummaryLinksField"
        Description="A test SummaryLinks field"
        Group="_Test Site Fields"
        RichText="TRUE"
        RichTextMode="FullHtml"
        Required="FALSE"
        SourceID="http://schemas.microsoft.com/sharepoint/v3">
      </Field>
    `));
  },

  /**
   * Run these tasks when rolling back this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  down(engineer) {
    // Delete fields
    engineer.task(pnp => pnp.sp.web.fields.getByTitle('TestHTMLField').delete());
    engineer.task(pnp => pnp.sp.web.fields.getByTitle('TestImageField').delete());
    engineer.task(pnp => pnp.sp.web.fields.getByTitle('TestLinkField').delete());
    engineer.task(pnp => pnp.sp.web.fields.getByTitle('TestSummaryLinksField').delete());
  },
};
