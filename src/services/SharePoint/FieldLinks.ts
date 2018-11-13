import _ from 'lodash';
import { ICollectionResponse, ISingleResponse } from './data/IResponse';
import { IFieldLink } from './data/IFieldLink';
import { Request } from './Request';

/**
 * SharePoint field links service
 */
export class FieldLinks {
  /**
   * Get all field links from the given web
   *
   * @param web Web URL, relative to site
   */
  public static getAll(web: string = ''): Promise<ICollectionResponse<IFieldLink>> {
    return Request.get<ICollectionResponse<IFieldLink>>(`${_.trim(web, '/')}/_api/fieldlinks`);
  }
}
