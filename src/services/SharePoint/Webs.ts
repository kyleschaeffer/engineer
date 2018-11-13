import _ from 'lodash';
import { ICollectionResponse, ISingleResponse } from './data/IResponse';
import { IWeb } from './data/IWeb';
import { Request } from './Request';

/**
 * SharePoint webs service
 */
export class Webs {
  /**
   * Get all views from the given list
   *
   * @param web Web URL, relative to site
   */
  public static getAll(web: string = ''): Promise<ICollectionResponse<IWeb>> {
    return Request.get<ICollectionResponse<IWeb>>(`${_.trim(web, '/')}/_api/views`);
  }
}
