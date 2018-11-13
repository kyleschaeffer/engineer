"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const request = __importStar(require("request-promise"));
const Auth_1 = require("./Auth");
const Env_1 = require("../../config/Env");
const Log_1 = require("../../utility/Log");
class Request {
    /**
     * Perform a GET request
     *
     * @param relativeEndpointUrl Endpoint URL, relative to site
     */
    static get(relativeEndpointUrl) {
        // Build request url
        const url = `${lodash_1.default.trim(Env_1.Env.site, '/')}/${lodash_1.default.trim(relativeEndpointUrl, '/')}`;
        // Perform GET request
        return new Promise((resolve, reject) => {
            return Auth_1.Auth.authenticate().then(headers => {
                return request.get({ url, headers }).then((response) => {
                    resolve(response);
                }).catch(response => reject(response));
            }).catch(response => {
                Log_1.Log.responseError(response);
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
    static post(relativeEndpointUrl, body) {
        // Build request url
        const url = `${lodash_1.default.trim(Env_1.Env.site, '/')}/${lodash_1.default.trim(relativeEndpointUrl, '/')}`;
        // Perform POST request
        return new Promise((resolve, reject) => {
            return Auth_1.Auth.authenticate().then(headers => {
                return request.post({
                    url,
                    headers,
                    body,
                    json: true,
                }).then((response) => {
                    resolve(response);
                }).catch(response => reject(response));
            }).catch(response => {
                Log_1.Log.responseError(response);
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
    static merge(relativeEndpointUrl, body, ifMatch = '*') {
        // Build request url
        const url = `${lodash_1.default.trim(Env_1.Env.site, '/')}/${lodash_1.default.trim(relativeEndpointUrl, '/')}`;
        // Perform MERGE request
        return new Promise((resolve, reject) => {
            return Auth_1.Auth.authenticate().then(headers => {
                // Build request headers
                const requestHeaders = lodash_1.default.merge({
                    'X-HTTP-Method': 'MERGE',
                    'IF-Match': ifMatch,
                }, headers);
                // Send request
                return request.post({
                    url,
                    headers: requestHeaders,
                    body,
                    json: true,
                }).then((response) => {
                    resolve(response);
                }).catch(response => reject(response));
            }).catch(response => {
                Log_1.Log.responseError(response);
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
    static delete(relativeEndpointUrl, ifMatch = '*') {
        // Build request url
        const url = `${lodash_1.default.trim(Env_1.Env.site, '/')}/${lodash_1.default.trim(relativeEndpointUrl, '/')}`;
        // Perform DELETE request
        return new Promise((resolve, reject) => {
            return Auth_1.Auth.authenticate().then(headers => {
                // Build request headers
                const requestHeaders = lodash_1.default.merge({
                    'X-HTTP-Method': 'DELETE',
                    'IF-Match': ifMatch,
                }, headers);
                // Send request
                return request.post({
                    url,
                    headers: requestHeaders,
                }).then((response) => {
                    resolve(response);
                }).catch(response => reject(response));
            }).catch(response => {
                Log_1.Log.responseError(response);
                reject();
            });
        });
    }
}
exports.Request = Request;
