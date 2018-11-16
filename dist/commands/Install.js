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
const Log_1 = require("../utility/Log");
const Migration_1 = require("../migrate/Migration");
const Status_1 = require("./Status");
/**
 * Install Engineer lists
 */
class Install {
    /**
     * Run the command
     */
    static run() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.install();
        });
    }
    /**
     * Install Engineer lists
     */
    static install() {
        return __awaiter(this, void 0, void 0, function* () {
            // Get migration status
            yield Status_1.Status.get();
            // Engineer already installed
            if (Status_1.Status.installed) {
                Log_1.Log.warning({
                    level: 2 /* Warning */,
                    key: 'install.already',
                });
                return true;
            }
            // Installing
            Log_1.Log.info({
                level: 2 /* Warning */,
                key: 'install.begin',
            });
            // Run install migration
            const installMigration = new Migration_1.Migration(Env_1.Env.install);
            yield installMigration.migrate().catch(error => Log_1.Log.responseError(error));
            Log_1.Log.info({
                level: 2 /* Warning */,
                key: 'install.end',
            });
            return true;
        });
    }
}
exports.Install = Install;
;
