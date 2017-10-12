#! /usr/bin/env node

const engineer = require('../app/engineer');
const program = require('commander');
const utility = require('../app/utility');

/**
 * Load configuration when on command
 * @return {[type]}
 */
const config = () => {
  engineer.load(program.config);
};

// Program
program.version('1.0.0')
  .option('-c, --config <file>', utility.log.translate('config.description'));

// Browse SharePoint
program.command('browse [list]')
  .description(utility.log.translate('browse.description'))
  .action((list) => {
    config();
    engineer.commands.browse.run(list).then(() => {});
  });

// Init
program.command('init')
  .description(utility.log.translate('init.description'))
  .action(() => {
    engineer.commands.init.run().then(() => {});
  });

// Install
program.command('install')
  .description(utility.log.translate('install.description'))
  .action(() => {
    config();
    engineer.commands.install.run().then(() => {});
  });

// Make migration
program.command('make <name>')
  .description(utility.log.translate('make.description'))
  .action((name) => {
    config();
    engineer.commands.make.run(name).then(() => {});
  });

// Migrate
program.command('migrate')
  .description(utility.log.translate('migrate.description'))
  .option('-t, --to <file>', utility.log.translate('migrate.to'))
  .action((options) => {
    config();
    engineer.commands.migrate.run(options.to).then(() => {});
  });

// Rollback
program.command('rollback')
  .description(utility.log.translate('rollback.description'))
  .option('-t, --to <file>', utility.log.translate('rollback.to'))
  .action((options) => {
    config();
    engineer.commands.rollback.run(options.to).then(() => {});
  });

// Status
program.command('status')
  .description(utility.log.translate('status.description'))
  .action(() => {
    config();
    engineer.commands.status.run().then(() => {});
  });

// Uninstall
program.command('uninstall')
  .description(utility.log.translate('uninstall.description'))
  .action(() => {
    config();
    engineer.commands.uninstall.run().then(() => {});
  });

// Parse command
program.parse(process.argv);

// Help
if (!program.args.length) program.help();
