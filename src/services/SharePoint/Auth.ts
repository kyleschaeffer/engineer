import _ from 'lodash';
import * as spauth from 'node-sp-auth';
import { Env } from '../../config/Env';

/**
 * SharePoint authentication service
 */
export class Auth {
  /**
   * Attempt authentication to SharePoint using node-sp-auth
   *
   * Returns request headers including an authentication token, which can be used in subsequent requests
   */
  public static authenticate(): Promise<{}> {
    return new Promise((resolve, reject) => {
      return spauth.getAuth(Env.site, Env.auth).then(authResponse => {
        // Set request headers
        const headers = {
          ...authResponse.headers,
          Accept: 'application/json;odata=verbose',
        };
        resolve(headers);
      }).catch(error => {
        reject(error);
      });
    });
  }
}
