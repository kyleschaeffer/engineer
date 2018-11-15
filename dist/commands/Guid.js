"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Log_1 = require("../utility/Log");
const SharePoint_1 = require("../utility/SharePoint");
const cp = require('copy-paste');
/**
 * Generate globally unique identifier (GUID)
 */
class Guid {
    /**
     * Run the command
     * @param simple Simple mode? (Default: false)
     */
    static run(simple = false) {
        const guid = SharePoint_1.SharePoint.guid(simple);
        cp.copy(guid);
        Log_1.Log.info({
            level: 2 /* Warning */,
            key: 'guid.complete',
        });
        Log_1.Log.table([[Log_1.Log.translate('guid.guid'), guid]]);
    }
}
exports.Guid = Guid;
;
