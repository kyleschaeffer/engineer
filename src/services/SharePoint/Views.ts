import _ from 'lodash';
import { ICollectionResponse, ISingleResponse } from './data/IResponse';
import { IView } from './data/IView';
import { Request } from './Request';

/**
 * SharePoint views service
 */
export class Views {
  /**
   * Get all views from the given list
   *
   * @param web Web URL, relative to site
   */
  public static getAll(web: string = ''): Promise<ICollectionResponse<IView>> {
    return Request.get<ICollectionResponse<IView>>(`${_.trim(web, '/')}/_api/views`);
  }
}
