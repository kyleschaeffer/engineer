"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SharePoint_1 = require("../utility/SharePoint");
/**
 * Engineer migration
 */
class Migration {
    /**
     * Create migration using up/down configuration
     *
     * @param migration Migration configuration
     */
    constructor(migration) {
        this.migration = migration;
        return this;
    }
    /**
     * Run activation/migration tasks
     */
    migrate() {
        return new Promise((resolve, reject) => {
            return this.migration.up(SharePoint_1.SharePoint.pnp())
                .then(response => resolve(response))
                .catch(response => reject(response));
        });
    }
    /**
     * Run activation/migration tasks
     */
    rollback() {
        return new Promise((resolve, reject) => {
            return this.migration.down(SharePoint_1.SharePoint.pnp())
                .then(response => resolve(response))
                .catch(response => reject(response));
        });
    }
}
exports.Migration = Migration;
