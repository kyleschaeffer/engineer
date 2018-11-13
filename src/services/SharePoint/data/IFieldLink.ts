/**
 * SharePoint field link resource
 *
 * Example endpoints:
 *  - _api/web/contenttypes/getbyid('0x01')/fieldlinks
 *  - _api/web/contenttypes/getbyid('0x01')/fieldlinks/getbyid('fa564e0f-0c70-4ab9-b863-0177e6ddd247')
 *  - _api/lists/getbytitle('ListTitle')/contenttypes/getbyid('0x01')/fieldlinks
 *  - _api/lists/getbytitle('ListTitle')/contenttypes/getbyid('0x01')/fieldlinks/getbyid('fa564e0f-0c70-4ab9-b863-0177e6ddd247')
 */
export interface IFieldLink {
  FieldInternalName?: string;
  Hidden?: boolean;
  Id?: string;
  Name?: string;
  Required?: boolean;
  __metadata?: {
    id: string;
    type: string;
    uri: string;
  };
}
