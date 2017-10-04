#! /usr/bin/env node

const engineer = require('../src/engineer');
const program = require('commander');

// Init the program
program.version('1.0.0')
  .option('-d, --dry', 'Dry run (read only)');

// Status
program.command('status')
  .description('Get current migration status')
  .action(() => {
    engineer.status();
  });

// Install
program.command('install')
  .description('Install hidden migration tracking list on target environment')
  .action(() => {
    engineer.install();
  });

// Migrate
program.command('migrate')
  .description('Run pending migrations')
  .action(() => {
    engineer.migrate();
  });

// Rollback
program.command('rollback')
  .description('Roll back last migration')
  .action(() => {
    engineer.rollback();
  });

// Reset
program.command('reset')
  .description('Roll back all migrations')
  .action(() => {
    engineer.reset();
  });

// Uninstall
program.command('uninstall')
  .description('Delete hidden migration tracking list from target environment')
  .action(() => {
    engineer.uninstall();
  });

// Parse command
program.parse(process.argv);

// Help
if (!program.args.length) program.help();
