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
const Log_1 = require("./Log");
/**
 * Engineer SharePoint utilities
 */
class SharePointUtility {
    constructor() {
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
                Log_1.Log.error(error);
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
            return request.get({ url, headers: this.headers }).then(response => {
                resolve(response);
            }).catch(error => {
                Log_1.Log.error(error);
                reject(error);
            });
        });
    }
}
/**
 * Engineer file utilities
 */
exports.SharePoint = new SharePointUtility();
