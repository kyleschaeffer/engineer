import _ from 'lodash';
import { ICollectionResponse, ISingleResponse } from './data/IResponse';
import { IList } from './data/IList';
import { Request } from './Request';

/**
 * SharePoint lists service
 */
export class Lists {
  /**
   * Get all lists from the given web
   *
   * @param web Web URL, relative to site
   */
  public static getAll(web: string = ''): Promise<ICollectionResponse<IList>> {
    return Request.get<ICollectionResponse<IList>>(`${_.trim(web, '/')}/_api/lists`);
  }

  /**
   * Get a list by title from the given web
   *
   * @param title The title of the list
   * @param web Web URL, relative to site
   */
  public static getByTitle(title: string, web: string = ''): Promise<ISingleResponse<IList>> {
    return Request.get<ISingleResponse<IList>>(`${_.trim(web, '/')}/_api/lists/getbytitle('${title}')`);
  }

  /**
   * Get a list by ID from the given web
   *
   * @param id The ID of the list
   * @param web Web URL, relative to site
   */
  public static getById(id: string, web: string = ''): Promise<ISingleResponse<IList>> {
    return Request.get<ISingleResponse<IList>>(`${_.trim(web, '/')}/_api/lists/getbyid('${id}')`);
  }
}
