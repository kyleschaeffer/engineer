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
const File_1 = require("../utility/File");
const Log_1 = require("../utility/Log");
const Migration_1 = require("../migrate/Migration");
const Status_1 = require("./Status");
/**
 * Run migrations
 */
class Migrate {
    /**
     * Run the command
     * @param options Migration options
     */
    static run(options) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get migration files
            let files = File_1.File.readDir('migrations');
            // No migrations
            if (!files || !files.length) {
                Log_1.Log.warning({
                    level: 3 /* Error */,
                    key: 'migrate.empty',
                });
                Log_1.Log.fail();
            }
            // Migrate to
            if (options.to) {
                this.migrateTo = File_1.File.fileName(options.to, false);
                if (!File_1.File.exists(`migrations/${this.migrateTo}.js`)) {
                    Log_1.Log.fail({
                        key: 'migrate.exist',
                        tokens: { file: this.migrateTo },
                    });
                }
            }
            // Only
            if (options.only) {
                const onlyFile = File_1.File.fileName(options.only, false);
                if (!File_1.File.exists(`migrations/${onlyFile}.js`)) {
                    Log_1.Log.fail({
                        key: 'migrate.exist',
                        tokens: { file: onlyFile },
                    });
                }
                files = [`${onlyFile}.js`];
            }
            // Step
            if (options.step) {
                const steps = parseInt(options.step, 10);
                if (!steps || steps < 1)
                    Log_1.Log.fail({ key: 'error.step' });
                this.step = steps;
            }
            // Get migration status
            yield Status_1.Status.get();
            // Not installed
            if (!Status_1.Status.installed) {
                Log_1.Log.error({
                    level: 3 /* Error */,
                    key: 'status.uninstalled',
                });
                Log_1.Log.fail();
            }
            // Queue migrations
            files.forEach(file => {
                // Get migration name
                const name = File_1.File.fileName(file, false);
                // Get migrated status
                const fileStatus = Status_1.Status.migrations[name];
                // Not already migrated?
                if ((options.force || !fileStatus || !fileStatus.migrated) && (!this.step || this.queue.length < this.step)) {
                    // Load migration file
                    try {
                        const data = require(`${process.cwd()}/migrations/${file}`);
                        const migration = new Migration_1.Migration(data);
                        // Add to queue
                        this.queue.push({ name, migration });
                    }
                    catch (e) {
                        Log_1.Log.fail({
                            key: 'error.migrationFile',
                            tokens: { file, message: e.message },
                        });
                    }
                }
            });
            // Nothing to migrate
            if (!this.queue.length) {
                Log_1.Log.warning({
                    level: 2 /* Warning */,
                    key: 'migrate.upToDate',
                });
                Log_1.Log.fail();
            }
            // Run migrations
            yield this.next();
            Log_1.Log.info({
                level: 2 /* Warning */,
                key: 'migrate.complete',
            });
        });
    }
    /**
     * Run next migration in queue
     */
    static next() {
        return __awaiter(this, void 0, void 0, function* () {
            // No migrations in queue
            if (!this.queue.length || this.stop)
                return;
            // Run next migration
            const migration = this.queue.shift();
            Log_1.Log.info({
                level: 2 /* Warning */,
                key: 'migrate.begin',
                tokens: { name: migration.name },
            });
            // Migrate
            yield migration.migration.migrate().catch(() => { });
            // Update status
            yield Status_1.Status.update(migration.name, true);
            // Migrate to
            if (this.migrateTo && this.migrateTo === migration.name) {
                this.stop = true;
                return;
            }
            // Next!
            return this.next();
        });
    }
}
/**
 * Migration queue
 */
Migrate.queue = [];
exports.Migrate = Migrate;
;
