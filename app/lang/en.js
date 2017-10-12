/**
 * English (U.S.) language file
 */
module.exports = {
  app: {
    name: 'Engineer',
    welcome: `                  _
  ___ _ __   __ _(_)_ __   ___  ___ _ __
 / _ \\ '_ \\ / _\` | | '_ \\ / _ \\/ _ \\ '__|
|  __/ | | | (_| | | | | |  __/  __/ |
 \\___|_| |_|\\__, |_|_| |_|\\___|\\___|_|
            |___/                        \n\n`,
  },

  auth: {
    begin: 'Authenticating: %site%...',
    context: 'Getting context...',
    error: 'failed.\n%title%: %message%\n',
  },

  browse: {
    begin: 'Opening: %path%...\n',
    description: 'Browse SharePoint site',
  },

  config: {
    description: 'Path to configuration file if not using "env.js"',
    failed: 'Failed to load config file: %path%\nUse "engineer init" to create a new config file.',
    using: 'Using config file: %path%\n',
  },

  error: {
    exists: 'already exists.\n',
    failed: 'failed.\n',
    message: 'Error %code%: %message%\n',
  },

  field: {
    create: 'Creating field in %target%: %field%...',
    delete: 'Deleting field from %target%: %field%...',
    get: 'Getting field from %target%: %field%...',
    update: 'Updating field in %target%: %field%...',
  },

  init: {
    description: 'Create "env.js" in the current directory',
    env: 'Creating environment config file "env.js"...',
    ignore: 'Creating ignore file ".gitignore"...',
  },

  install: {
    already: 'Engineer is already installed.\n',
    begin: 'Installing Engineer...\n',
    complete: 'Engineer installed.\n',
    description: 'Install Engineer tracking lists on SharePoint',
  },

  list: {
    create: 'Creating list: %list%...',
    delete: 'Deleting list: %list%...',
    get: 'Getting list: %list%...',
    list: 'list "%list%"',
    update: 'Updating list: %list%...',
  },

  make: {
    begin: 'Creating migration: %name%...',
    description: 'Create a new migration file',
  },

  migrate: {
    begin: 'Migrating: %name%...\n',
    complete: 'Migration complete.\n',
    description: 'Run pending migrations',
    empty: 'Nothing to migrate. Use "engineer make <name>" to create a new migration.\n',
    exist: 'Migration does not exist: %file%\n',
    force: 'Run migrations even if they\'re already migrated\n',
    to: 'Migrate up to this file, but don\'t run later migrations',
    upToDate: 'Migrations are already up to date.\n',
  },

  rollback: {
    begin: 'Rolling back: %name%...\n',
    complete: 'Rollback complete.\n',
    description: 'Roll back migrations',
    empty: 'Nothing to roll back.\n',
    force: 'Roll back migrations even if they\'re already rolled back\n',
    to: 'Roll back all migrations after this file',
    upToDate: 'Migrations are already rolled back.\n',
  },

  site: {
    site: 'site "%site%"',
  },

  status: {
    description: 'Show migration status',
    get: 'Getting migration status...',
    migrated: 'Migrated',
    pending: 'Pending',
    set: 'Updating migration status: %migration%...',
    uninstalled: 'Engineer is not installed. Use "engineer install" to begin.\n',
  },

  success: {
    done: 'done.\n',
  },

  uninstall: {
    already: 'Engineer is already uninstalled.\n',
    begin: 'Uninstalling Engineer...\n',
    complete: 'Engineer uninstalled.\n',
    description: 'Delete Engineer tracking lists from SharePoint',
  },

  view: {
    create: 'Creating view on list "%list%": %view%...',
    delete: 'Deleting view on list "%list%": %view%...',
    get: 'Getting view on list "%list%": %view%...',
    update: 'Updating view on list "%list%": %view%...',
  },

  viewField: {
    add: 'Adding field to view "%view%" on list "%list%": %field%...',
    move: 'Moving field in view "%view%" on list "%list%": %field%...',
  },
};
