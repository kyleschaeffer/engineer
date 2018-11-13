/**
 * SharePoint list item resource
 *
 * Example endpoints:
 *  - _api/lists/getbytitle('ListTitle')/items
 *  - _api/lists/getbytitle('ListTitle')/items/getbyid(0)
 */
export interface IListItem {
  AttachmentFiles?: { __deferred: { uri: string; } };
  AuthorId?: number;
  BannerImageUrl?: any;
  CanvasContent1?: any;
  CheckoutUserId?: any;
  ComplianceAssetId?: any;
  ContentType?: { __deferred: { uri: string; } };
  ContentTypeId?: string;
  Created?: string;
  Description?: any;
  EditorId?: number;
  FieldValuesAsHtml?: { __deferred: { uri: string; } };
  FieldValuesAsText?: { __deferred: { uri: string; } };
  FieldValuesForEdit?: { __deferred: { uri: string; } };
  File?: { __deferred: { uri: string; } };
  FileSystemObjectType?: number;
  FirstPublishedDate?: any;
  FirstUniqueAncestorSecurableObject?: { __deferred: { uri: string; } };
  Folder?: { __deferred: { uri: string; } };
  GUID?: string;
  GetDlpPolicyTip?: { __deferred: { uri: string; } };
  ID?: number;
  Id?: number;
  LayoutWebpartsContent?: any;
  LikedByInformation?: { __deferred: { uri: string; } };
  Modified?: string;
  OData__AuthorBylineId?: any;
  OData__CopySource?: any;
  OData__OriginalSourceItemId?: any;
  OData__OriginalSourceListId?: any;
  OData__OriginalSourceSiteId?: any;
  OData__OriginalSourceUrl?: any;
  OData__OriginalSourceWebId?: any;
  OData__TopicHeader?: any;
  OData__UIVersionString?: string;
  ParentList?: { __deferred: { uri: string; } };
  PromotedState?: number;
  Properties?: { __deferred: { uri: string; } };
  RoleAssignments?: { __deferred: { uri: string; } };
  ServerRedirectedEmbedUri?: any;
  ServerRedirectedEmbedUrl?: string;
  Title?: string;
  Versions?: { __deferred: { uri: string; } };
  WikiField?: any;
  _AuthorBylineStringId?: any;
  __metadata?: {
    etag: string;
    id: string;
    type: string;
    uri: string;
  };
}
