import _ from 'lodash';
import program from 'commander';
import { Env } from './config/Env';
import { File } from './utility/File';
import { IEnvironmentConfiguration } from './config/IEnvironmentConfiguration';
import { Log } from './utility/Log';
import { LogLevel } from './utility/LogLevel';
import { Status } from './commands/Status';

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
  const options = File.load(path) as IEnvironmentConfiguration;

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

// // Install
// program.command('install')
//   .description(Log.translate('install.description'))
//   .action(() => {
//     config().then(Engineer.commands.install.run());
//   });

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
    Status.run().then(() => {
      Log.info('Status complete.');
    }).catch(error => {
      // console.log('Command failed:', error);
    });
  });

// // Uninstall
// program.command('uninstall')
//   .description(Log.translate('uninstall.description'))
//   .action(() => {
//     config().then(Engineer.commands.uninstall.run());
//   });

// Parse command
program.parse(process.argv);

// Help
if (!program.args.length) program.help();
