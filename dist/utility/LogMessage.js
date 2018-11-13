"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
/**
 * Log message
 */
class LogMessage {
    constructor(options = {}, newLogLevel) {
        this.level = 1 /* Info */;
        this.content = null;
        this.key = null;
        this.tokens = {};
        this.nl = true;
        lodash_1.default.merge(this, typeof (options) === 'string' ? { content: options } : options);
        if (newLogLevel)
            this.level = newLogLevel;
    }
}
exports.LogMessage = LogMessage;
