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
const Env_1 = require("./Env");
/**
 * Engineer install migration
 */
exports.InstallMigration = {
    /**
     * Configure tasks that are executed on migration activation
     *
     * @param sp SharePoint REST API access via PnP-JS-Core (https://github.com/pnp/pnpjs/blob/dev/packages/sp/docs/index.md)
     */
    up(sp) {
        return __awaiter(this, void 0, void 0, function* () {
            // Create migrations list
            yield sp.web.lists.add(Env_1.Env.lists.migrations, 'Engineer migrations list', 100, true, {
                Hidden: true,
                NoCrawl: true,
            });
            // Create Migrated field
            yield sp.web.lists.getByTitle(Env_1.Env.lists.migrations).fields.addBoolean('Migrated');
            // Add Migrated field to view
            yield sp.web.lists.getByTitle(Env_1.Env.lists.migrations).views.getByTitle('All Items').fields.add('Migrated');
        });
    },
    /**
     * Configure tasks that are executed on migration deactivation/rollback
     *
     * @param sp SharePoint REST API access via PnP-JS-Core (https://github.com/pnp/pnpjs/blob/dev/packages/sp/docs/index.md)
     */
    down(sp) {
        return __awaiter(this, void 0, void 0, function* () {
            // Delete migrations list
            yield sp.web.lists.getByTitle(Env_1.Env.lists.migrations).delete();
        });
    },
};
