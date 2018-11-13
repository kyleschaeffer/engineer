import _ from 'lodash';
import program from 'commander';
import { Env } from './config/Env';
import { File } from './utility/File';
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
  Log.info({
    key: 'config.using',
    tokens: { path: File.path(path) },
  });
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

  // Subscribe to @pnp/logging
  Log.subscribe();
};

// Program
program.version('2.0.0')
  .option('-c, --config <file>', Log.translate('config.description'))
  .option('-q, --quiet', Log.translate('config.quiet'))
  .option('-i, --info', Log.translate('config.info'))
  .option('-v, --verbose', Log.translate('config.verbose'));

// // Browse SharePoint
// program.command('browse [list]')
//   .description(Log.translate('browse.description'))
//   .action(list => {
//     config().then(Engineer.commands.browse.run(list));
//   });

// // Create GUID
// program.command('guid')
//   .description(Log.translate('guid.description'))
//   .option('-s, --simple', Log.translate('guid.simple'))
//   .action(options => {
//     Engineer.commands.guid.run(options);
//   });

// // Init
// program.command('init')
//   .description(Log.translate('init.description'))
//   .action(() => {
//     Engineer.commands.init.run();
//   });

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

// // Manifest
// program.command('manifest')
//   .description(Log.translate('manifest.description'))
//   .action(() => {
//     config().then(Engineer.commands.manifest.run());
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
