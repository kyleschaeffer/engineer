"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const Request_1 = require("./Request");
/**
 * SharePoint fields service
 */
class Fields {
    /**
     * Get all fields from the given web
     *
     * @param web Web URL, relative to site
     */
    static getAll(web = '') {
        return Request_1.Request.get(`${lodash_1.default.trim(web, '/')}/_api/fields`);
    }
}
exports.Fields = Fields;
