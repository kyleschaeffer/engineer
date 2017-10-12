module.exports = {
  /**
   * Run these tasks when activating this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  up(engineer) {
    // HTML field
    engineer.field.fromSchema('<Field Name="TestHTMLField" StaticName="TestHTMLField" SourceID="http://schemas.microsoft.com/sharepoint/v3" Group="_Test Site Fields" DisplayName="TestHTMLField" Description="A test HTML field" Type="HTML" Required="FALSE" RichText="TRUE" RichTextMode="FullHtml" />');

    // Publishing image field
    engineer.field.fromSchema('<Field Name="TestPublishingImageField" StaticName="TestPublishingImageField" SourceID="http://schemas.microsoft.com/sharepoint/v3" Group="_Test Site Fields" DisplayName="TestPublishingImageField" Description="A test publishing image field" Type="Image" Required="FALSE" RichText="TRUE" RichTextMode="FullHtml" />');

    // Summary links field
    engineer.field.fromSchema('<Field Name="TestSummaryLinksField" StaticName="TestSummaryLinksField" SourceID="http://schemas.microsoft.com/sharepoint/v3" Group="_Test Site Fields" DisplayName="TestSummaryLinksField" Description="A test summary links field" Type="SummaryLinks" Required="FALSE" RichText="TRUE" RichTextMode="FullHtml" />');
  },

  /**
   * Run these tasks when rolling back this migration. See
   * https://github.com/oldrivercreative/engineer for more information on
   * Engineer tasks.
   */
  down(engineer) {
    // Delete fields
    engineer.field.delete('TestHTMLField');
    engineer.field.delete('TestPublishingImageField');
    engineer.field.delete('TestSummaryLinksField');
  },
};
