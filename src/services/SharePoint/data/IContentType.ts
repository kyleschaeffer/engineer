/**
 * SharePoint content type resource
 *
 * Example endpoints:
 *  - _api/web/contenttypes
 *  - _api/web/contenttypes/getbyid('0x01')
 *  - _api/lists/getbytitle('ListTitle')/contenttypes
 *  - _api/lists/getbytitle('ListTitle')/contenttypes/getbyid('0x01')
 */
export interface IContentType {
  Description?: string;
  DescriptionResource?: { __deferred: { uri: string; } };
  DisplayFormTemplateName?: string;
  DisplayFormUrl?: string;
  DocumentTemplate?: string;
  DocumentTemplateUrl?: string;
  EditFormTemplateName?: string;
  EditFormUrl?: string;
  FieldLinks?: { __deferred: { uri: string; } };
  Fields?: { __deferred: { uri: string; } };
  Group?: string;
  Hidden?: boolean;
  Id?: {
    StringValue: string;
    __metadata: { type: string; };
  };
  JSLink?: string;
  MobileDisplayFormUrl?: string;
  MobileEditFormUrl?: string;
  MobileNewFormUrl?: string;
  Name?: string;
  NameResource?: { __deferred: { uri: string; } };
  NewFormTemplateName?: string;
  NewFormUrl?: string;
  Parent?: { __deferred: { uri: string; } };
  ReadOnly?: boolean;
  SchemaXml?: string;
  Scope?: string;
  Sealed?: boolean;
  StringId?: string;
  WorkflowAssociations?: { __deferred: { uri: string; } };
  __metadata?: {
    id: string;
    type: string;
    uri: string;
  };
}
