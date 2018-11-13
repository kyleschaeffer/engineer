/**
 * SharePoint site resource
 *
 * Example endpoints:
 *  - _api/site
 */
export interface ISite {
  AllowCreateDeclarativeWorkflow?: boolean;
  AllowDesigner?: boolean;
  AllowMasterPageEditing?: boolean;
  AllowRevertFromTemplate?: boolean;
  AllowSaveDeclarativeWorkflowAsTemplate?: boolean;
  AllowSavePublishDeclarativeWorkflow?: boolean;
  AllowSelfServiceUpgrade?: boolean;
  AllowSelfServiceUpgradeEvaluation?: boolean;
  Audit?: { __deferred: { uri: string; } };
  AuditLogTrimmingRetention?: number;
  Classification?: string;
  CompatibilityLevel?: number;
  CurrentChangeToken?: {
    StringValue: string;
    __metadata: { type: string; };
  };
  CustomScriptSafeDomains?: { __deferred: { uri: string; } };
  DisableAppViews?: boolean;
  DisableCompanyWideSharingLinks?: boolean;
  DisableFlows?: boolean;
  EventReceivers?: { __deferred: { uri: string; } };
  ExternalSharingTipsEnabled?: boolean;
  Features?: { __deferred: { uri: string; } };
  GeoLocation?: string;
  GroupId?: string;
  HubSiteId?: string;
  Id?: string;
  IsHubSite?: boolean;
  LockIssue?: any;
  MaxItemsPerThrottledOperation?: number;
  NeedsB2BUpgrade?: boolean;
  Owner?: { __deferred: { uri: string; } };
  PrimaryUri?: string;
  ReadOnly?: boolean;
  RecycleBin?: { __deferred: { uri: string; } };
  RequiredDesignerVersion?: string;
  ResourcePath?: {
    DecodedUrl: string;
    __metadata: { type: string; };
  };
  RootWeb?: { __deferred: { uri: string; } };
  SandboxedCodeActivationCapability?: number;
  SecondaryContact?: { __deferred: { uri: string; } };
  SensitivityLabel?: string;
  ServerRelativeUrl?: string;
  ShareByEmailEnabled?: boolean;
  ShareByLinkEnabled?: boolean;
  ShowUrlStructure?: boolean;
  TrimAuditLog?: boolean;
  UIVersionConfigurationEnabled?: boolean;
  UpgradeReminderDate?: string;
  UpgradeScheduled?: boolean;
  UpgradeScheduledDate?: string;
  Upgrading?: boolean;
  Url?: string;
  UserCustomActions?: { __deferred: { uri: string; } };
  __metadata?: {
    id: string;
    type: string;
    uri: string;
  }
}
