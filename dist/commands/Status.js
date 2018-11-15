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
            yield this.get();
            // Not installed
            if (!this.status.installed) {
                Log_1.Log.warning({
                    level: 2 /* Warning */,
                    key: 'status.uninstalled',
                });
                return Log_1.Log.fail();
            }
            // Show migrations
            const rows = Object.keys(this.status.migrations).map(file => [
                File_1.File.fileName(this.status.migrations[file].file, false),
                this.status.migrations[file].migrated ? Log_1.Log.translate('status.migrated') : Log_1.Log.translate('status.pending'),
            ]);
            Log_1.Log.table(rows);
        });
    }
    /**
     * Get Engineer migration status
     */
    static get() {
        return __awaiter(this, void 0, void 0, function* () {
            // Status is cached
            if (this.status)
                return;
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
                this.status = { installed: false };
            }
            // Getting status
            Log_1.Log.info({
                level: 1 /* Info */,
                key: 'status.get',
            });
            // Get migration status
            try {
                // Get migration list items
                const migrationListItems = yield SharePoint_1.SharePoint.pnp().web.lists.getByTitle(Env_1.Env.lists.migrations).items.get();
                // Create new status collection
                const migrations = {};
                // Find intersection between migration files and list items
                files.forEach(file => {
                    // New file status
                    const fileStatus = {
                        file,
                        migrated: false,
                        migrationId: null,
                    };
                    // Get migrated status from migrations list
                    const fileListItem = migrationListItems.filter(listItem => listItem.Title == File_1.File.fileName(file, false));
                    // Update file status
                    if (fileListItem.length) {
                        fileStatus.migrated = fileListItem[0].Migrated;
                        fileStatus.migrationId = fileListItem[0].Id;
                    }
                    // Save file status
                    migrations[file] = fileStatus;
                });
                // Set status
                this.status = {
                    installed: true,
                    migrations,
                };
            }
            catch (e) {
                // Problem getting status
                this.status = { installed: false };
            }
        });
    }
    /**
     * Update the Engineer migrations list
     * @param name The migration file name
     * @param migrated New migrated status
     */
    static update(name, migrated) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get migration
            Log_1.Log.info({
                level: 1 /* Info */,
                key: 'status.set',
                tokens: { migration: name },
            });
            // Get migration status
            yield this.get();
            // Create new status
            if (!this.status.migrations[name] || !this.status.migrations[name].migrationId) {
                try {
                    // New migration list item
                    const newItem = yield SharePoint_1.SharePoint.pnp().web.lists.getByTitle(Env_1.Env.lists.migrations).items.add({
                        Title: name,
                        Migrated: migrated,
                    });
                    // Update migration list item id
                    if (newItem && newItem.data && newItem.data.Id) {
                        this.status.migrations[name] = newItem.data.Id;
                    }
                    Log_1.Log.info({
                        level: 2 /* Warning */,
                        key: 'success.done',
                    });
                    return true;
                }
                catch (e) {
                    // Failed to create new list item
                    Log_1.Log.warning({
                        level: 2 /* Warning */,
                        key: 'status.failed',
                    });
                    return false;
                }
            }
            // Update status
            else {
                try {
                    // Update migration list item
                    yield SharePoint_1.SharePoint.pnp().web.lists.getByTitle(Env_1.Env.lists.migrations).items.getById(this.status.migrations[name].migrationId).update({
                        Migrated: migrated,
                    });
                    Log_1.Log.info({
                        level: 2 /* Warning */,
                        key: 'success.done',
                    });
                    return true;
                }
                catch (e) {
                    Log_1.Log.warning({
                        level: 2 /* Warning */,
                        key: 'status.failed',
                    });
                    Log_1.Log.error(e);
                    return false;
                }
            }
        });
    }
}
exports.Status = Status;
;
