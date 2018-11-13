"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const Request_1 = require("./Request");
/**
 * SharePoint lists service
 */
class Lists {
    /**
     * Get all lists from the given web
     *
     * @param web Web URL, relative to site
     */
    static getAll(web = '') {
        return Request_1.Request.get(`${lodash_1.default.trim(web, '/')}/_api/lists`);
    }
    /**
     * Get a list by title from the given web
     *
     * @param title The title of the list
     * @param web Web URL, relative to site
     */
    static getByTitle(title, web = '') {
        return Request_1.Request.get(`${lodash_1.default.trim(web, '/')}/_api/lists/getbytitle('${title}')`);
    }
    /**
     * Get a list by ID from the given web
     *
     * @param id The ID of the list
     * @param web Web URL, relative to site
     */
    static getById(id, web = '') {
        return Request_1.Request.get(`${lodash_1.default.trim(web, '/')}/_api/lists/getbyid('${id}')`);
    }
}
exports.Lists = Lists;
