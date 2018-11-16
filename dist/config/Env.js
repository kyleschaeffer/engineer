"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InstallMigration_1 = require("./InstallMigration");
/**
 * Engineer environment configuration
 */
exports.Env = {
    auth: null,
    install: InstallMigration_1.InstallMigration,
    lang: 'en_us',
    lists: { migrations: 'EngineerMigrations' },
    logLevel: 2 /* Warning */,
    site: '',
};
