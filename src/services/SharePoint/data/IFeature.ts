/**
 * SharePoint feature resource
 *
 * Example endpoints:
 *  - _api/site/features
 *  - _api/site/features/getbyid('232b3f94-9d6e-4ed6-8d55-04d5a44ac449')
 */
export interface IFeature {
  DefinitionId?: string;
  __metadata?: {
    id: string;
    type: string;
    uri: string;
  };
}
