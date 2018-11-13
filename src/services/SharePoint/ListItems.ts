import _ from 'lodash';
import { ICollectionResponse, ISingleResponse } from './data/IResponse';
import { IListItem } from './data/IListItem';
import { Request } from './Request';

/**
 * SharePoint list items service
 */
export class ListItems {
  /**
   * Get all list items from the given list and web
   *
   * @param web Web URL, relative to site
   */
  public static getAll(web: string = ''): Promise<ICollectionResponse<IListItem>> {
    return Request.get<ICollectionResponse<IListItem>>(`${_.trim(web, '/')}/_api/lists/getbytitle('ListTitle')/items`);
  }
}
