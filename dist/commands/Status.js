"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const File_1 = require("../utility/File");
const Lists_1 = require("../services/SharePoint/Lists");
const Log_1 = require("../utility/Log");
/**
 * Get Engineer status
 */
class Status {
    /**
     * Run the command
     */
    static run() {
        return new Promise((resolve, reject) => {
            // Get migration files
            Log_1.Log.info({
                key: 'migrate.using',
                tokens: { path: File_1.File.path('migrations') },
            });
            const files = File_1.File.readDir('migrations');
            // No migrations
            if (!files || !files.length) {
                Log_1.Log.warning({ key: 'migrate.empty' });
                return reject();
            }
            // Getting status
            Log_1.Log.info({ key: 'status.get', nl: false });
            // Get status
            Lists_1.Lists.getAll('/').then(response => {
                Log_1.Log.dump(JSON.stringify(response, null, 2));
                resolve();
            }).catch(response => reject(response));
        });
    }
}
exports.Status = Status;
;
