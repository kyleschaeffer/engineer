"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const Env_1 = require("../config/Env");
const Log_1 = require("../utility/Log");
const opn = require('opn');
/**
 * Browse SharePoint site
 */
class Browse {
    /**
     * Run the command
     * @param url Relative URL from site
     */
    static run(url) {
        // Build list URI
        let path = Env_1.Env.site;
        // Engineer lists
        if (url === 'migrations')
            path += `/Lists/${Env_1.Env.lists.migrations}`;
        // Relative URL
        else if (url)
            path += `/${lodash_1.default.trim(url, '/')}`;
        // Open
        Log_1.Log.info({
            level: 2 /* Warning */,
            key: 'browse.begin',
            tokens: { path },
        });
        opn(path, { wait: false });
    }
}
exports.Browse = Browse;
;
