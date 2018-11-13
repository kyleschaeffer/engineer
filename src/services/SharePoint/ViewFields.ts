import _ from 'lodash';
import { ICollectionResponse, ISingleResponse } from './data/IResponse';
import { IViewField } from './data/IViewField';
import { Request } from './Request';

/**
 * SharePoint view fields service
 */
export class ViewFields {
  /**
   * Get all view fields from the given view
   *
   * @param web Web URL, relative to site
   */
  public static getAll(web: string = ''): Promise<ICollectionResponse<IViewField>> {
    return Request.get<ICollectionResponse<IViewField>>(`${_.trim(web, '/')}/_api/viewfields`);
  }
}
