"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pnp_auth_1 = require("pnp-auth");
const Env_1 = require("../config/Env");
const sp_1 = require("@pnp/sp");
const uuid = require('uuid');
/**
 * Engineer string utilities
 */
class SharePoint {
    /**
     * Generate a globally unique identifier (GUID)
     *
     * @param simple Display GUID in "simple" mode? Good for working with content types
     */
    static guid(simple = false) {
        let guid = uuid();
        if (simple)
            guid = guid.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
        return guid;
    }
    /**
     * Get an instance of PnP-JS-Core configured with authentication
     */
    static pnp() {
        pnp_auth_1.bootstrap(sp_1.sp, Env_1.Env.auth, Env_1.Env.site);
        return sp_1.sp;
    }
}
exports.SharePoint = SharePoint;
