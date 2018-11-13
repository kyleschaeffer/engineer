"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const spauth = __importStar(require("node-sp-auth"));
const Env_1 = require("../../config/Env");
/**
 * SharePoint authentication service
 */
class Auth {
    /**
     * Attempt authentication to SharePoint using node-sp-auth
     *
     * Returns request headers including an authentication token, which can be used in subsequent requests
     */
    static authenticate() {
        return new Promise((resolve, reject) => {
            return spauth.getAuth(Env_1.Env.site, Env_1.Env.auth).then(authResponse => {
                // Set request headers
                const headers = Object.assign({}, authResponse.headers, { Accept: 'application/json;odata=verbose' });
                resolve(headers);
            }).catch(error => {
                reject(error);
            });
        });
    }
}
exports.Auth = Auth;
