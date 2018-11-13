import _ from 'lodash';
import { ICollectionResponse, ISingleResponse } from './data/IResponse';
import { IFeature } from './data/IFeature';
import { Request } from './Request';

/**
 * SharePoint features service
 */
export class Features {
  /**
   * Get all views from the given list
   *
   * @param web Web URL, relative to site
   */
  public static getAll(web: string = ''): Promise<ICollectionResponse<IFeature>> {
    return Request.get<ICollectionResponse<IFeature>>(`${_.trim(web, '/')}/_api/views`);
  }
}
