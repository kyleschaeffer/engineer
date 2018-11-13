/**
 * SharePoint list view resource
 *
 * Example endpoints:
 *  - _api/lists/getbytitle('ListTitle')/views
 *  - _api/lists/getbytitle('ListTitle')/views/getbyid('040b40e5-782d-4f28-a53b-7822ececd7fb')
 */
export interface IView {
  Aggregations?: any;
  AggregationsStatus?: any;
  BaseViewId?: string;
  ColumnWidth?: any;
  ContentTypeId?: {
    StringValue: string;
    __metadata: { type: string; };
  };
  CustomFormatter?: any;
  DefaultView?: boolean;
  DefaultViewForContentType?: boolean;
  EditorModified?: boolean;
  Formats?: any;
  Hidden?: boolean;
  HtmlSchemaXml?: string;
  Id?: string;
  ImageUrl?: string;
  IncludeRootFolder?: boolean;
  JSLink?: string;
  ListViewXml?: string;
  Method?: any;
  MobileDefaultView?: boolean;
  MobileView?: boolean;
  ModerationType?: any;
  NewDocumentTemplates?: any;
  OrderedView?: boolean;
  Paged?: boolean;
  PersonalView?: boolean;
  ReadOnlyView?: boolean;
  RequiresClientIntegration?: boolean;
  RowLimit?: number;
  Scope?: number;
  ServerRelativePath?: {
    DecodedUrl: string;
    __metadata: { type: string; };
  };
  ServerRelativeUrl?: string;
  StyleId?: any;
  TabularView?: boolean;
  Threaded?: boolean;
  Title?: string;
  Toolbar?: string;
  ToolbarTemplateName?: string;
  ViewData?: any;
  ViewFields?: { __deferred: { uri: string; } };
  ViewJoins?: any;
  ViewProjectedFields?: any;
  ViewQuery?: string;
  ViewType?: string;
  VisualizationInfo?: any;
  __metadata?: {
    id: string;
    type: string;
    uri: string;
  };
}
