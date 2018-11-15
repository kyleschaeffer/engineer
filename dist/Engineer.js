#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const commander_1 = __importDefault(require("commander"));
const Browse_1 = require("./commands/Browse");
const Env_1 = require("./config/Env");
const File_1 = require("./utility/File");
const Guid_1 = require("./commands/Guid");
const Init_1 = require("./commands/Init");
const Install_1 = require("./commands/Install");
const Log_1 = require("./utility/Log");
const Make_1 = require("./commands/Make");
const Status_1 = require("./commands/Status");
const Uninstall_1 = require("./commands/Uninstall");
/**
 * Load configuration from file
 */
const config = function () {
    // Load config file
    const path = commander_1.default.config || 'env.js';
    const options = File_1.File.load(path);
    // No config file found
    if (!options) {
        Log_1.Log.fail({
            key: 'config.failed',
            tokens: { path: File_1.File.path(path) },
        });
    }
    // Load environment config
    lodash_1.default.merge(Env_1.Env, options);
    // Logging mode
    if (commander_1.default.quiet)
        Env_1.Env.logLevel = 99 /* Off */;
    if (commander_1.default.info)
        Env_1.Env.logLevel = 1 /* Info */;
    if (commander_1.default.verbose)
        Env_1.Env.logLevel = 0 /* Verbose */;
    // Using
    Log_1.Log.info({
        level: 1 /* Info */,
        key: 'config.using',
        tokens: { path: File_1.File.path(path) },
    });
    // Subscribe to @pnp/logging
    Log_1.Log.subscribe();
};
// Program
commander_1.default.version('2.0.0')
    .option('-c, --config <file>', Log_1.Log.translate('config.description'))
    .option('-q, --quiet', Log_1.Log.translate('config.quiet'))
    .option('-i, --info', Log_1.Log.translate('config.info'))
    .option('-v, --verbose', Log_1.Log.translate('config.verbose'));
// Browse SharePoint
commander_1.default.command('browse [url]')
    .description(Log_1.Log.translate('browse.description'))
    .action(url => {
    config();
    Browse_1.Browse.run(url);
});
// Create GUID
commander_1.default.command('guid')
    .description(Log_1.Log.translate('guid.description'))
    .option('-s, --simple', Log_1.Log.translate('guid.simple'))
    .action(options => {
    config();
    Guid_1.Guid.run(options.simple);
});
// Init
commander_1.default.command('init')
    .description(Log_1.Log.translate('init.description'))
    .action(() => {
    Init_1.Init.run();
});
// Install
commander_1.default.command('install')
    .description(Log_1.Log.translate('install.description'))
    .action(() => {
    config();
    Install_1.Install.run();
});
// Make migration
commander_1.default.command('make <name>')
    .description(Log_1.Log.translate('make.description'))
    .action(name => {
    config();
    Make_1.Make.run(name);
});
// // Migrate
// program.command('migrate')
//   .description(Log.translate('migrate.description'))
//   .option('-t, --to <file>', Log.translate('migrate.to'))
//   .option('-o, --only <file>', Log.translate('migrate.only'))
//   .option('-s, --step <number>', Log.translate('migrate.step'))
//   .option('-f, --force', Log.translate('migrate.force'))
//   .action(options => {
//     config().then(Engineer.commands.migrate.run(options));
//   });
// // Rollback
// program.command('rollback')
//   .description(Log.translate('rollback.description'))
//   .option('-t, --to <file>', Log.translate('rollback.to'))
//   .option('-o, --only <file>', Log.translate('rollback.only'))
//   .option('-s, --step <number>', Log.translate('rollback.step'))
//   .option('-f, --force', Log.translate('rollback.force'))
//   .action(options => {
//     config().then(Engineer.commands.rollback.run(options));
//   });
// Status
commander_1.default.command('status')
    .description(Log_1.Log.translate('status.description'))
    .action(() => {
    config();
    Status_1.Status.run();
});
// Uninstall
commander_1.default.command('uninstall')
    .description(Log_1.Log.translate('uninstall.description'))
    .action(() => {
    config();
    Uninstall_1.Uninstall.run();
});
// Parse command
commander_1.default.parse(process.argv);
// Help
if (!commander_1.default.args.length)
    commander_1.default.help();
