/**
 * SharePoint field resource
 *
 * Example endpoints:
 *  - _api/web/fields
 *  - _api/web/fields/getbytitle('Title')
 *  - _api/web/fields/getbyid('fa564e0f-0c70-4ab9-b863-0177e6ddd247')
 *  - _api/lists/getbytitle('Pages')/fields
 *  - _api/lists/getbytitle('Pages')/fields/getbytitle('Title')
 *  - _api/lists/getbytitle('Pages')/fields/getbyid('fa564e0f-0c70-4ab9-b863-0177e6ddd247')
 */
export interface IField {
  AutoIndexed?: boolean;
  CanBeDeleted?: boolean;
  ClientSideComponentId?: string;
  ClientSideComponentProperties?: any;
  CustomFormatter?: any;
  DefaultFormula?: any;
  DefaultValue?: any;
  Description?: string;
  DescriptionResource?: { __deferred: { uri: string; } };
  Direction?: string;
  EnforceUniqueValues?: boolean;
  EntityPropertyName?: string;
  FieldTypeKind?: number;
  Filterable?: boolean;
  FromBaseType?: boolean;
  Group?: string;
  Hidden?: boolean;
  Id?: string;
  Indexed?: boolean;
  InternalName?: string;
  JSLink?: string;
  MaxLength?: number;
  PinnedToFiltersPane?: boolean;
  ReadOnlyField?: boolean;
  Required?: boolean;
  SchemaXml?: string;
  Scope?: string;
  Sealed?: boolean;
  ShowInFiltersPane?: number;
  Sortable?: boolean;
  StaticName?: string;
  Title?: string;
  TitleResource?: { __deferred: { uri: string; } };
  TypeAsString?: string;
  TypeDisplayName?: string;
  TypeShortDescription?: string;
  ValidationFormula?: any;
  ValidationMessage?: any;
  __metadata?: {
    id: string;
    type: string;
    uri: string;
  };
}
