import _ from 'lodash';
import { ICollectionResponse, ISingleResponse } from './data/IResponse';
import { IContentType } from './data/IContentType';
import { Request } from './Request';
import { String } from '../../utility/String';

/**
 * SharePoint content types service
 */
export class ContentTypes {
  /**
   * Create a new content type
   *
   * @param name The name of the content type
   * @param id The ID of the content type (should include parent content type ID followed by '00')
   * @param options Additional options for the content type
   */
  public static add(name: string, id: string = String.guid(true), options?: IContentType): Promise<any> {
    // Content type config
    const contentType: IContentType = _.merge({
      Description: '',
      Group: 'Custom Content Types',
      Id: { StringValue: id },
      Name: name,
      __metadata: { type: 'SP.ContentType' },
    }, options);

    return Request.post<any>('', contentType);
  }

  /**
   * Add available content type to target list
   *
   * @param id The ID of the availabl econtent type
   */
  public static addAvailable(id: string): Promise<any> {
    return Request.post<any>('', {
      contentTypeId: id,
    });
  }
}
