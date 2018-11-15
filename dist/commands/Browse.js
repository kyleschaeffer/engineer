"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Env_1 = require("../config/Env");
const Log_1 = require("../utility/Log");
const opn = require('opn');
/**
 * Browse SharePoint site
 */
class Browse {
    /**
     * Run the command
     */
    static run(list) {
        // Build list URI
        let path = Env_1.Env.site;
        // Special lists
        if (list === 'migrations')
            path += `/Lists/${Env_1.Env.lists.migrations}`;
        else if (list)
            path += `/Lists/${list}`;
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
