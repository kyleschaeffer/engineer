import _ from 'lodash';
import { ICollectionResponse, ISingleResponse } from './data/IResponse';
import { ISite } from './data/ISite';
import { Request } from './Request';

/**
 * SharePoint sites service
 */
export class Sites {
  /**
   * Get all views from the given list
   *
   * @param web Web URL, relative to site
   */
  public static getAll(web: string = ''): Promise<ICollectionResponse<ISite>> {
    return Request.get<ICollectionResponse<ISite>>(`${_.trim(web, '/')}/_api/views`);
  }
}
