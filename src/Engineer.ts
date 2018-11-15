#! /usr/bin/env node

import _ from 'lodash';
import program from 'commander';
import { Browse } from './commands/Browse';
import { Env } from './config/Env';
import { File } from './utility/File';
import { Guid } from './commands/Guid';
import { Init } from './commands/Init';
import { Install } from './commands/Install';
import { Log } from './utility/Log';
import { LogLevel } from '@pnp/logging';
import { Status } from './commands/Status';
import { Uninstall } from './commands/Uninstall';

/**
 * Load configuration from file
 */
const config = function(): void {
  // Load config file
  const path = program.config || 'env.js';
  const options = File.load(path);

  // No config file found
  if (!options) {
    Log.fail({
      key: 'config.failed',
      tokens: { path: File.path(path) },
    });
  }

  // Load environment config
  _.merge(Env, options);

  // Logging mode
  if (program.quiet) Env.logLevel = LogLevel.Off;
  if (program.info) Env.logLevel = LogLevel.Info;
  if (program.verbose) Env.logLevel = LogLevel.Verbose;

  // Using
  Log.info({
    level: LogLevel.Info,
    key: 'config.using',
    tokens: { path: File.path(path) },
  });

  // Subscribe to @pnp/logging
  Log.subscribe();
};

// Program
program.version('2.0.0')
  .option('-c, --config <file>', Log.translate('config.description'))
  .option('-q, --quiet', Log.translate('config.quiet'))
  .option('-i, --info', Log.translate('config.info'))
  .option('-v, --verbose', Log.translate('config.verbose'));

// Browse SharePoint
program.command('browse [url]')
  .description(Log.translate('browse.description'))
  .action(url => {
    config();
    Browse.run(url);
  });

// Create GUID
program.command('guid')
  .description(Log.translate('guid.description'))
  .option('-s, --simple', Log.translate('guid.simple'))
  .action(options => {
    config();
    Guid.run(options.simple);
  });

// Init
program.command('init')
  .description(Log.translate('init.description'))
  .action(() => {
    Init.run();
  });

// Install
program.command('install')
  .description(Log.translate('install.description'))
  .action(() => {
    config();
    Install.run();
  });

// // Make migration
// program.command('make <name>')
//   .description(Log.translate('make.description'))
//   .action(name => {
//     config().then(Engineer.commands.make.run(name));
//   });

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
program.command('status')
  .description(Log.translate('status.description'))
  .action(() => {
    config();
    Status.run();
  });

// Uninstall
program.command('uninstall')
  .description(Log.translate('uninstall.description'))
  .action(() => {
    config();
    Uninstall.run();
  });

// Parse command
program.parse(process.argv);

// Help
if (!program.args.length) program.help();
