import _ from 'lodash';
import * as request from 'request-promise';
import { Auth } from './Auth';
import { Env } from '../../config/Env';
import { Log } from '../../utility/Log';

export class Request {
  /**
   * Perform a GET request
   *
   * @param relativeEndpointUrl Endpoint URL, relative to site
   */
  public static get<T>(relativeEndpointUrl: string): Promise<T> {
    // Build request url
    const url = `${_.trim(Env.site, '/')}/${_.trim(relativeEndpointUrl, '/')}`;

    // Perform GET request
    return new Promise((resolve, reject) => {
      return Auth.authenticate().then(headers => {
        return request.get({ url, headers }).then((response: T) => {
          resolve(response);
        }).catch(response => reject(response));
      }).catch(response => {
        Log.responseError(response);
        reject();
      });
    });
  }

  /**
   * Perform a POST request
   *
   * @param relativeEndpointUrl Endpoint URL, relative to site
   * @param body JSON post data
   */
  public static post<T>(relativeEndpointUrl: string, body: any): Promise<T> {
    // Build request url
    const url = `${_.trim(Env.site, '/')}/${_.trim(relativeEndpointUrl, '/')}`;

    // Perform POST request
    return new Promise((resolve, reject) => {
      return Auth.authenticate().then(headers => {
        return request.post({
          url,
          headers,
          body,
          json: true,
        }).then((response: T) => {
          resolve(response);
        }).catch(response => reject(response));
      }).catch(response => {
        Log.responseError(response);
        reject();
      });
    });
  }

  /**
   * Perform a MERGE request
   *
   * @param relativeEndpointUrl Endpoint URL, relative to site
   * @param body JSON post data
   * @param ifMatch Matching conditions for MERGE (Default: "*")
   */
  public static merge<T>(relativeEndpointUrl: string, body: any, ifMatch: string = '*'): Promise<T> {
    // Build request url
    const url = `${_.trim(Env.site, '/')}/${_.trim(relativeEndpointUrl, '/')}`;

    // Perform MERGE request
    return new Promise((resolve, reject) => {
      return Auth.authenticate().then(headers => {
        // Build request headers
        const requestHeaders = _.merge({
          'X-HTTP-Method': 'MERGE',
          'IF-Match': ifMatch,
        }, headers);

        // Send request
        return request.post({
          url,
          headers: requestHeaders,
          body,
          json: true,
        }).then((response: T) => {
          resolve(response);
        }).catch(response => reject(response));
      }).catch(response => {
        Log.responseError(response);
        reject();
      });
    });
  }

  /**
   * Perform a DELETE request
   *
   * @param relativeEndpointUrl Endpoint URL, relative to site
   * @param ifMatch Matching conditions for DELETE (Default: "*")
   */
  public static delete<T>(relativeEndpointUrl: string, ifMatch: string = '*'): Promise<T> {
    // Build request url
    const url = `${_.trim(Env.site, '/')}/${_.trim(relativeEndpointUrl, '/')}`;

    // Perform DELETE request
    return new Promise((resolve, reject) => {
      return Auth.authenticate().then(headers => {
        // Build request headers
        const requestHeaders = _.merge({
          'X-HTTP-Method': 'DELETE',
          'IF-Match': ifMatch,
        }, headers);

        // Send request
        return request.post({
          url,
          headers: requestHeaders,
        }).then((response: T) => {
          resolve(response);
        }).catch(response => reject(response));
      }).catch(response => {
        Log.responseError(response);
        reject();
      });
    });
  }
}
