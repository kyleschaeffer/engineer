"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Log_1 = require("../utility/Log");
const File_1 = require("../utility/File");
/**
 * Initialize Engineer project directory
 */
class Init {
    /**
     * Run the command
     */
    static run() {
        Log_1.Log.info({
            level: 2 /* Warning */,
            key: 'init.begin',
        });
        Log_1.Log.indent();
        // .gitignore
        Log_1.Log.info({
            level: 2 /* Warning */,
            key: 'init.ignore',
            nl: false,
        });
        // Create new file
        if (!File_1.File.exists('.gitignore')) {
            File_1.File.write('.gitignore', true, '/env.js\n');
            Log_1.Log.info({
                level: 2 /* Warning */,
                key: 'success.done',
            });
        }
        // Already exists
        else {
            Log_1.Log.warning({
                level: 2 /* Warning */,
                key: 'error.exists',
            });
        }
        // env.js
        Log_1.Log.info({
            level: 2 /* Warning */,
            key: 'init.env',
            nl: false,
        });
        // Create new file
        if (!File_1.File.exists('env.js')) {
            File_1.File.fromTemplate('env.js', 'env.js', true, 'w+');
            Log_1.Log.info({
                level: 2 /* Warning */,
                key: 'success.done',
            });
        }
        // Already exists
        else {
            Log_1.Log.warning({
                level: 2 /* Warning */,
                key: 'error.exists',
            });
        }
        Log_1.Log.outdent();
        Log_1.Log.info({
            level: 2 /* Warning */,
            key: 'init.complete',
        });
    }
}
exports.Init = Init;
;
