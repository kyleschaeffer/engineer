/**
 * SharePoint web resource
 *
 * Example endpoints:
 *  - _api/web/webs
 *  - subsite/_api/web/webs
 */
export interface IWeb {
  Activities?: { __deferred: { uri: string; } };
  ActivityLogger?: { __deferred: { uri: string; } };
  Alerts?: { __deferred: { uri: string; } };
  AllProperties?: { __deferred: { uri: string; } };
  AllowRssFeeds?: boolean;
  AlternateCssUrl?: string;
  AppInstanceId?: string;
  AppTiles?: { __deferred: { uri: string; } };
  AssociatedMemberGroup?: { __deferred: { uri: string; } };
  AssociatedOwnerGroup?: { __deferred: { uri: string; } };
  AssociatedVisitorGroup?: { __deferred: { uri: string; } };
  Author?: { __deferred: { uri: string; } };
  AvailableContentTypes?: { __deferred: { uri: string; } };
  AvailableFields?: { __deferred: { uri: string; } };
  ClientWebParts?: { __deferred: { uri: string; } };
  Configuration?: number;
  ContentTypes?: { __deferred: { uri: string; } };
  Created?: string;
  CurrentChangeToken?: {
    StringValue: string;
    __metadata: { type: string; };
  };
  CurrentUser?: { __deferred: { uri: string; } };
  CustomMasterUrl?: string;
  DataLeakagePreventionStatusInfo?: { __deferred: { uri: string; } };
  Description?: string;
  DescriptionResource?: { __deferred: { uri: string; } };
  DesignPackageId?: string;
  DocumentLibraryCalloutOfficeWebAppPreviewersDisabled?: boolean;
  EnableMinimalDownload?: boolean;
  EventReceivers?: { __deferred: { uri: string; } };
  Features?: { __deferred: { uri: string; } };
  Fields?: { __deferred: { uri: string; } };
  FirstUniqueAncestorSecurableObject?: { __deferred: { uri: string; } };
  Folders?: { __deferred: { uri: string; } };
  FooterEnabled?: boolean;
  HeaderEmphasis?: number;
  HeaderLayout?: number;
  HorizontalQuickLaunch?: boolean;
  HostedApps?: { __deferred: { uri: string; } };
  Id?: string;
  IsMultilingual?: boolean;
  Language?: number;
  LastItemModifiedDate?: string;
  LastItemUserModifiedDate?: string;
  ListTemplates?: { __deferred: { uri: string; } };
  Lists?: { __deferred: { uri: string; } };
  MasterUrl?: string;
  MegaMenuEnabled?: boolean;
  Navigation?: { __deferred: { uri: string; } };
  NoCrawl?: boolean;
  ObjectCacheEnabled?: boolean;
  OneDriveSharedItems?: { __deferred: { uri: string; } };
  OverwriteTranslationsOnChange?: boolean;
  ParentWeb?: { __deferred: { uri: string; } };
  PushNotificationSubscribers?: { __deferred: { uri: string; } };
  QuickLaunchEnabled?: boolean;
  RecycleBin?: { __deferred: { uri: string; } };
  RecycleBinEnabled?: boolean;
  RegionalSettings?: { __deferred: { uri: string; } };
  ResourcePath?: {
    DecodedUrl: string;
    __metadata: { type: string; };
  };
  RoleAssignments?: { __deferred: { uri: string; } };
  RoleDefinitions?: { __deferred: { uri: string; } };
  RootFolder?: { __deferred: { uri: string; } };
  ServerRelativeUrl?: string;
  SiteCollectionAppCatalog?: { __deferred: { uri: string; } };
  SiteGroups?: { __deferred: { uri: string; } };
  SiteLogoUrl?: any;
  SiteUserInfoList?: { __deferred: { uri: string; } };
  SiteUsers?: { __deferred: { uri: string; } };
  SyndicationEnabled?: boolean;
  TenantAppCatalog?: { __deferred: { uri: string; } };
  ThemeInfo?: { __deferred: { uri: string; } };
  Title?: string;
  TitleResource?: { __deferred: { uri: string; } };
  TreeViewEnabled?: boolean;
  UIVersion?: number;
  UIVersionConfigurationEnabled?: boolean;
  Url?: string;
  UserCustomActions?: { __deferred: { uri: string; } };
  WebInfos?: { __deferred: { uri: string; } };
  WebTemplate?: string;
  Webs?: { __deferred: { uri: string; } };
  WelcomePage?: string;
  WorkflowAssociations?: { __deferred: { uri: string; } };
  WorkflowTemplates?: { __deferred: { uri: string; } };
  __metadata?: {
    id: string;
    type: string;
    uri: string;
  };
}
