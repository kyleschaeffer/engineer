/**
 * English (U.S.) language file
 */
module.exports = {
  app: {
    name: 'Engineer',
    string: '<%= string %>',
    welcome: `                  _
  ___ _ __   __ _(_)_ __   ___  ___ _ __
 / _ \\ '_ \\ / _\` | | '_ \\ / _ \\/ _ \\ '__|
|  __/ | | | (_| | | | | |  __/  __/ |
 \\___|_| |_|\\__, |_|_| |_|\\___|\\___|_|
            |___/                        \n`,
  },

  browse: {
    begin: 'Opening: <%= path %>...',
    description: 'Browse SharePoint site',
  },

  config: {
    description: 'Path to configuration file if not using "env.js"',
    failed: 'Failed to load config file: <%= path %>Use "engineer init" to create a new config file.',
    using: 'Using config file: <%= path %>',
  },

  error: {
    exists: 'already exists.',
    failed: 'failed.',
    message: '<%= code %> Error: <%= message %>',
  },

  guid: {
    complete: 'GUID generated and copied to your clipboard.',
    description: 'Generate a random GUID string',
    guid: 'GUID:',
  },

  init: {
    description: 'Create "env.js" in the current directory',
    env: 'Creating environment config file "env.js"...',
    ignore: 'Creating ignore file ".gitignore"...',
  },

  install: {
    already: 'Engineer is already installed.',
    begin: 'Installing Engineer...',
    complete: 'Engineer installed.',
    description: 'Install Engineer tracking lists on SharePoint',
  },

  make: {
    begin: 'Creating migration: <%= name %>...',
    description: 'Create a new migration file',
  },

  migrate: {
    begin: 'Migrating: <%= name %>...',
    complete: 'Migration complete.',
    count: 'Task #<%= current %> of <%= total %>...',
    description: 'Run pending migrations',
    empty: 'Nothing to migrate. Use "engineer make <name>" to create a new migration.',
    exist: 'Migration file does not exist: <%= file %>',
    force: 'Run migrations even if they\'re already migrated',
    only: 'Migrate only this file',
    to: 'Migrate up to this file, but don\'t run later migrations',
    upToDate: 'Migrations are already up to date.',
  },

  rollback: {
    begin: 'Rolling back: <%= name %>...',
    complete: 'Rollback complete.',
    description: 'Roll back migrations',
    empty: 'Nothing to roll back.',
    force: 'Roll back migrations even if they\'re already rolled back',
    only: 'Roll back only this file',
    to: 'Roll back all migrations after this file',
    upToDate: 'Migrations are already rolled back.',
  },

  status: {
    description: 'Show migration status',
    get: 'Getting migration status...',
    migrated: 'Migrated',
    pending: 'Pending',
    set: 'Updating migration status: <%= migration %>...',
    uninstalled: 'Engineer is not installed. Use "engineer install" to begin.',
  },

  success: {
    done: 'done.',
  },

  uninstall: {
    already: 'Engineer is already uninstalled.',
    begin: 'Uninstalling Engineer...',
    complete: 'Engineer uninstalled.',
    description: 'Delete Engineer tracking lists from SharePoint',
  },
};
