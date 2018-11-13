import _ from 'lodash';
import { ICollectionResponse, ISingleResponse } from './data/IResponse';
import { IField } from './data/IField';
import { Request } from './Request';

/**
 * SharePoint fields service
 */
export class Fields {
  /**
   * Get all fields from the given web
   *
   * @param web Web URL, relative to site
   */
  public static getAll(web: string = ''): Promise<ICollectionResponse<IField>> {
    return Request.get<ICollectionResponse<IField>>(`${_.trim(web, '/')}/_api/fields`);
  }
}
