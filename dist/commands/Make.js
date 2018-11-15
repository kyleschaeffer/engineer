"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const File_1 = require("../utility/File");
const Log_1 = require("../utility/Log");
const moment_1 = __importDefault(require("moment"));
/**
 * Create new migration file
 */
class Make {
    /**
     * Run the command
     * @param name Migration file name (will be kebab-cased)
     */
    static run(name = 'New Migration') {
        // Create migration
        Log_1.Log.info({
            level: 2 /* Warning */,
            key: 'make.begin',
            tokens: { name },
            nl: false,
        });
        // Create migrations directory
        File_1.File.mkdir('migrations');
        // Generate timestamped file path
        const path = `migrations/${moment_1.default().utc().format('YYYYMMDDHHmmss')}-${lodash_1.default.kebabCase(name)}.js`;
        // Write file from template
        File_1.File.fromTemplate('migration.js', path);
        Log_1.Log.info({
            level: 2 /* Warning */,
            key: 'success.done',
        });
        Log_1.Log.indent();
        Log_1.Log.info({
            level: 2 /* Warning */,
            key: 'make.file',
            tokens: { path },
        });
    }
}
exports.Make = Make;
;
