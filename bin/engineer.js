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
  .option('-c, --config <file>', 'Path to configuration file if not using "./env.js"')
  .option('-d, --dry', 'Dry run (read only)');

// Init
program.command('init')
  .description('Initialize the current working directory as an Engineer project')
  .action(() => {
    engineer.commands.init.run();
  });

// Status
program.command('status')
  .description('Get current migration status')
  .action(() => {
    config();
    engineer.commands.status.run();
  });

// Install
program.command('install')
  .description('Install hidden migration tracking list on target environment')
  .action(() => {
    config();
    engineer.commands.install.run();
  });

// Migrate
program.command('migrate')
  .description('Run pending migrations')
  .action(() => {
    config();
    engineer.commands.migrate.run();
  });

// Rollback
program.command('rollback')
  .description('Roll back last migration')
  .action(() => {
    config();
    engineer.commands.rollback.run();
  });

// Reset
program.command('reset')
  .description('Roll back all migrations')
  .action(() => {
    config();
    engineer.commands.reset.run();
  });

// Uninstall
program.command('uninstall')
  .description('Delete hidden migration tracking list from target environment')
  .action(() => {
    config();
    engineer.commands.uninstall.run();
  });

// Make migration
program.command('make <name>')
  .description('Create a new migration file')
  .action((name) => {
    config();
    engineer.commands.make.run(name);
  });

// Browse SharePoint
program.command('browse [list]')
  .description('Open SharePoint in a web browser')
  .action((list) => {
    config();
    engineer.commands.browse.run(list);
  });

// Parse command
program.parse(process.argv);

// Help
if (!program.args.length) program.help();
