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
const spauth = __importStar(require("node-sp-auth"));
const Config_1 = require("../config/Config");
const Utility_1 = require("../utility/Utility");
/**
 * SharePoint web services
 */
class SharePointService {
    constructor() {
        /**
         * Request headers for all HTTP requests
         *
         * Contains authentication token after running the authenticate() method at least once
         */
        this.headers = {};
    }
    /**
     * Attempt authentication to SharePoint using node-sp-auth
     *
     * Returns request headers including an authentication token, which can be used in subsequent requests
     */
    authenticate() {
        return new Promise((resolve, reject) => {
            return spauth.getAuth(Config_1.Config.Env.site, Config_1.Config.Env.auth).then(authResponse => {
                // Set request headers
                this.headers = Object.assign({}, authResponse.headers, { Accept: 'application/json;odata=verbose' });
                resolve();
            }).catch(error => {
                Utility_1.Utility.Log.error(error);
                reject(error);
            });
        });
    }
    /**
     * Perform a GET request
     *
     * @param relativeEndpointUrl Endpoint URL, relative to site
     */
    get(relativeEndpointUrl) {
        // Build request url
        const url = `${lodash_1.default.trim(Config_1.Config.Env.site, '/')}/${lodash_1.default.trim(relativeEndpointUrl, '/')}`;
        // Perform GET request
        return new Promise((resolve, reject) => {
            return this.authenticate().then(() => {
                return request.get({ url, headers: this.headers }).then((response) => {
                    resolve(response);
                }).catch(response => {
                    Utility_1.Utility.Log.responseError(response);
                    reject();
                });
            }).catch(response => {
                Utility_1.Utility.Log.responseError(response);
                reject();
            });
        });
    }
    /**
     * Get lists from the given web
     *
     * @param web Web URL, relative to site
     */
    getLists(web = '') {
        return this.get(`${lodash_1.default.trim(web, '/')}/_api/lists`);
    }
    /**
     * Get a list by title from the given web
     *
     * @param title The title of the list
     * @param web Web URL, relative to site
     */
    getListByTitle(title, web = '') {
        return this.get(`${lodash_1.default.trim(web, '/')}/_api/lists/getbytitle('${title}')`);
    }
    /**
     * Get a list by ID from the given web
     *
     * @param id The ID of the list
     * @param web Web URL, relative to site
     */
    getListById(id, web = '') {
        return this.get(`${lodash_1.default.trim(web, '/')}/_api/lists/getbyid('${id}')`);
    }
}
/**
 * SharePoint web services
 */
exports.SharePoint = new SharePointService();
