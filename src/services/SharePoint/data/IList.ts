/**
 * SharePoint list resource
 *
 * Example endpoints:
 *  - _api/lists
 *  - _api/lists/getbytitle('Site Pages')
 *  - _api/lists/getbyid('72770a64-d2d2-4c6f-b6ce-a025cdcbb6d0')
 */
export interface IList {
  AllowContentTypes?: boolean;
  BaseTemplate?: number;
  BaseType?: number;
  ContentTypes?: { __deferred: { uri: string; } };
  ContentTypesEnabled?: boolean;
  CrawlNonDefaultViews?: boolean;
  CreatablesInfo?: { __deferred: { uri: string; } };
  Created?: string;
  CurrentChangeToken?: {
    StringValue: string;
    __metadata: { type: string; };
  };
  CustomActionElements?: {
    Items: {
      results: ICustomActionElementItem[];
      __metadata: { type: string; };
    };
    __metadata: { type: string; };
  };
  DefaultContentApprovalWorkflowId?: string;
  DefaultItemOpenUseListSetting?: boolean;
  DefaultView?: { __deferred: { uri: string; } };
  Description?: string;
  DescriptionResource?: { __deferred: { uri: string; } };
  Direction?: string;
  DisableGridEditing?: boolean;
  DocumentTemplateUrl?: any;
  DraftVersionVisibility?: number;
  EnableAttachments?: boolean;
  EnableFolderCreation?: boolean;
  EnableMinorVersions?: boolean;
  EnableModeration?: boolean;
  EnableRequestSignOff?: boolean;
  EnableVersioning?: boolean;
  EntityTypeName?: string;
  EventReceivers?: { __deferred: { uri: string; } };
  ExemptFromBlockDownloadOfNonViewableFiles?: boolean;
  Fields?: { __deferred: { uri: string; } };
  FileSavePostProcessingEnabled?: boolean;
  FirstUniqueAncestorSecurableObject?: { __deferred: { uri: string; } };
  ForceCheckout?: boolean;
  Forms?: { __deferred: { uri: string; } };
  HasExternalDataSource?: boolean;
  Hidden?: boolean;
  Id?: string;
  ImagePath?: {
    DecodedUrl: string;
    __metadata: { type: string; };
  };
  ImageUrl?: string;
  InformationRightsManagementSettings?: { __deferred: { uri: string; } };
  IrmEnabled?: boolean;
  IrmExpire?: boolean;
  IrmReject?: boolean;
  IsApplicationList?: boolean;
  IsCatalog?: boolean;
  IsPrivate?: boolean;
  ItemCount?: number;
  Items?: { __deferred: { uri: string; } };
  LastItemDeletedDate?: string;
  LastItemModifiedDate?: string;
  LastItemUserModifiedDate?: string;
  ListExperienceOptions?: number;
  ListItemEntityTypeFullName?: string;
  MajorVersionLimit?: number;
  MajorWithMinorVersionsLimit?: number;
  MultipleDataList?: boolean;
  NoCrawl?: boolean;
  ParentWeb?: { __deferred: { uri: string; } };
  ParentWebPath?: {
    DecodedUrl: string;
    __metadata: { type: string; };
  };
  ParentWebUrl?: string;
  ParserDisabled?: boolean;
  RoleAssignments?: { __deferred: { uri: string; } };
  RootFolder?: { __deferred: { uri: string; } };
  ServerTemplateCanCreateFolders?: boolean;
  Subscriptions?: { __deferred: { uri: string; } };
  TemplateFeatureId?: string;
  Title?: string;
  TitleResource?: { __deferred: { uri: string; } };
  UserCustomActions?: { __deferred: { uri: string; } };
  Views?: { __deferred: { uri: string; } };
  WorkflowAssociations?: { __deferred: { uri: string; } };
  __metadata?: {
    etag: string;
    id: string;
    type: string;
    uri: string;
  };
}

interface ICustomActionElementItem {
  ClientSideComponentId: string;
  ClientSideComponentProperties: string;
  CommandUIExtension: any;
  EnabledScript: any;
  Id: string;
  ImageUrl: any;
  Location: string;
  RegistrationId: string;
  RegistrationType: number;
  RequireSiteAdministrator: boolean;
  Rights: {
    High: string;
    Low: string;
    __metadata: { type: string; };
  };
  Title: string;
  UrlAction: string;
}
