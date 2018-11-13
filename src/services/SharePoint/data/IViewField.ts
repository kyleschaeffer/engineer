/**
 * SharePoint list view field resource
 *
 * Example endpoints:
 *  - _api/lists/getbytitle('ListTitle')/views/getbyid('040b40e5-782d-4f28-a53b-7822ececd7fb')/viewfields
 */
export interface IViewField {
  Items?: {
    results: string[];
    __metadata: { type: string; };
  };
  SchemaXml?: string;
  __metadata?: {
    id: string;
    type: string;
    uri: string;
  };
}
