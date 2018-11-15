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
 * Uninstall Engineer lists
 */
class Uninstall {
    /**
     * Run the command
     */
    static run() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.uninstall();
        });
    }
    /**
     * Install Engineer lists
     */
    static uninstall() {
        return __awaiter(this, void 0, void 0, function* () {
            // Get status
            const status = yield Status_1.Status.get();
            // Already uninstalled
            if (!status.installed) {
                Log_1.Log.warning({
                    level: 2 /* Warning */,
                    key: 'uninstall.already',
                });
                return true;
            }
            // Uninstalling
            Log_1.Log.info({
                level: 2 /* Warning */,
                key: 'uninstall.begin',
            });
            // Roll back install migration
            const installMigration = new Migration_1.Migration(Env_1.Env.install);
            yield installMigration.rollback().catch(error => Log_1.Log.responseError(error));
            Log_1.Log.info({
                level: 2 /* Warning */,
                key: 'uninstall.end',
            });
            return true;
        });
    }
}
exports.Uninstall = Uninstall;
;
