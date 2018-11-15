"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Env_1 = require("../config/Env");
const File_1 = require("../utility/File");
const Log_1 = require("../utility/Log");
const SharePoint_1 = require("../utility/SharePoint");
/**
 * Get Engineer status
 */
class Status {
    /**
     * Run the command
     */
    static run() {
        return __awaiter(this, void 0, void 0, function* () {
            // Get status
            const status = yield this.get();
            // Not installed
            if (!status.installed) {
                Log_1.Log.warning({
                    level: 2 /* Warning */,
                    key: 'status.uninstalled',
                });
                return Log_1.Log.fail();
            }
            // Show migrations
            const rows = status.migrations.map(migration => [
                File_1.File.fileName(migration.file, false),
                migration.migrated ? Log_1.Log.translate('status.migrated') : Log_1.Log.translate('status.pending'),
            ]);
            Log_1.Log.table(rows);
        });
    }
    /**
     * Get Engineer migration status
     */
    static get() {
        return __awaiter(this, void 0, void 0, function* () {
            // Get migration files
            Log_1.Log.info({
                level: 1 /* Info */,
                key: 'migrate.using',
                tokens: { path: File_1.File.path('migrations') },
            });
            const files = File_1.File.readDir('migrations');
            // No migrations
            if (!files || !files.length) {
                Log_1.Log.warning({
                    level: 2 /* Warning */,
                    key: 'migrate.empty',
                });
                return { installed: false };
            }
            // Getting status
            Log_1.Log.info({
                level: 1 /* Info */,
                key: 'status.get',
            });
            // Get migration status
            try {
                const migrations = yield SharePoint_1.SharePoint.pnp().web.lists.getByTitle(Env_1.Env.lists.migrations).items.get();
                // Find intersection between migration files and list items
                const migratedStatuses = [];
                files.forEach(file => {
                    const migratedStatus = { file, migrated: false };
                    migrations.forEach(migration => {
                        if (migration.Title === migratedStatus.file)
                            migratedStatus.migrated = migration.Migrated;
                    });
                    migratedStatuses.push(migratedStatus);
                });
                // Received migration status
                return {
                    installed: true,
                    migrations: migratedStatuses,
                };
                // Problem getting migrations
            }
            catch (e) {
                return { installed: false };
            }
        });
    }
}
exports.Status = Status;
;
