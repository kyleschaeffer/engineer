#! /usr/bin/env node

const engineer = require('../src/engineer');
const program = require('commander');

// Init the program
program.version('1.0.0');

// Install
program.command('install')
  .description('Install a hidden migration tracking list on target environment')
  .option('-d, --dry', 'Dry run, no changes will be made')
  .action(() => {
    engineer.install();
  });

// Migrate
program.command('migrate')
  .description('Run pending migrations')
  .option('-d, --dry', 'Dry run, no changes will be made')
  .action(() => {
    engineer.migrate();
  });

// Status
program.command('status')
  .description('Get current migration status')
  .action(() => {
    engineer.status();
  });

// Parse command
program.parse(process.argv);

// Help
if (!program.args.length) program.help();
