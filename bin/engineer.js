#! /usr/bin/env node

const engineer = require('../app/engineer');
const program = require('commander');

/**
 * Load configuration when on command
 * @return {[type]}
 */
const config = () => {
  engineer.load(program.config);
};

// Program
program.version('1.0.0')
  .option('-c, --config <file>', 'Path to configuration file if not using "env.js"');

// Browse SharePoint
program.command('browse [list]')
  .description('Browse SharePoint site')
  .action((list) => {
    config();
    engineer.commands.browse.run(list).then(() => {});
  });

// Init
program.command('init')
  .description('Create env.js in the current directory')
  .action(() => {
    engineer.commands.init.run().then(() => {});
  });

// Install
program.command('install')
  .description('Install Engineer tracking lists on SharePoint')
  .action(() => {
    config();
    engineer.commands.install.run().then(() => {});
  });

// Make migration
program.command('make <name>')
  .description('Create a new migration file')
  .action((name) => {
    config();
    engineer.commands.make.run(name).then(() => {});
  });

// Migrate
program.command('migrate')
  .description('Run pending migrations')
  .option('-t, --to <file>', 'Migrate up to this file, but don\'t run later migrations')
  .action((options) => {
    config();
    engineer.commands.migrate.run(options.to).then(() => {});
  });

// Rollback
program.command('rollback')
  .description('Roll back migrations')
  .option('-t, --to <file>', 'Roll back all migrations after this file')
  .action((options) => {
    config();
    engineer.commands.rollback.run(options.to).then(() => {});
  });

// Status
program.command('status')
  .description('Show migration status')
  .action(() => {
    config();
    engineer.commands.status.run().then(() => {});
  });

// Uninstall
program.command('uninstall')
  .description('Delete Engineer tracking lists from SharePoint')
  .action(() => {
    config();
    engineer.commands.uninstall.run().then(() => {});
  });

// Parse command
program.parse(process.argv);

// Help
if (!program.args.length) program.help();
