/**
 * English (U.S.) language file
 */
module.exports = {
  app: {
    name: 'Engineer',
    start: 'Starting up...',
    string: '<%= string %>',
    welcome: `                  _
  ___ _ __   __ _(_)_ __   ___  ___ _ __
 / _ \\ '_ \\ / _\` | | '_ \\ / _ \\/ _ \\ '__|
|  __/ | | | (_| | | | | |  __/  __/ |
 \\___|_| |_|\\__, |_|_| |_|\\___|\\___|_|
            |___/                        \n`,
  },

  auth: {
    csom: 'Some operations are not supported using the authentication credentials you provided. You must use either user credentials (SAML) or add-in credentials (client ID and secret ID) to use some features of Engineer.',
  },

  browse: {
    begin: 'Opening: <%= path %>...',
    description: 'Browse SharePoint site',
  },

  config: {
    description: 'Path to configuration file if not using "env.js"',
    failed: 'Failed to load config file: <%= path %>Use "engineer init" to create a new config file.',
    using: `Using config file: ${'<%= path %>'.magenta}`,
  },

  contentType: {
    add: 'Adding content type: <%= contentType %>',
    delete: 'Deleting content type: <%= contentType %>',
    update: 'Updating content type: <%= contentType %>',
  },

  error: {
    exists: 'already exists.',
    failed: 'failed.',
    message: '<%= code %> Error: <%= message %>',
  },

  field: {
    add: 'Adding field: <%= field %>',
    delete: 'Deleting field: <%= field %>',
    update: 'Updating field: <%= field %>',
  },

  fieldLink: {
    add: 'Adding field link: <%= fieldLink %>',
    remove: 'Removing field link: <%= fieldLink %>',
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

  list: {
    add: 'Adding list: <%= list %>',
    delete: 'Deleting list: <%= list %>',
    update: 'Updating list: <%= list %>',
  },

  make: {
    begin: 'Creating migration: <%= name %>...',
    description: 'Create a new migration file',
  },

  manifest: {
    get: 'Getting manifest...',
    set: 'Updating manifest: <%= contentType %>...',
  },

  migrate: {
    begin: `Migrating: ${'<%= name %>'.cyan.bold}`,
    complete: 'Migration complete.'.bold,
    count: `${'Task #<%= current %>'.white.bold} of <%= total %>:`,
    description: 'Run pending migrations',
    empty: 'Nothing to migrate. Use "engineer make <name>" to create a new migration.',
    exist: 'Migration file does not exist: <%= file %>',
    force: 'Run migrations even if they\'re already migrated',
    only: 'Migrate only this file',
    to: 'Migrate up to this file, but don\'t run later migrations',
    upToDate: 'Migrations are already up to date.',
  },

  rollback: {
    begin: `Rolling back: ${'<%= name %>'.cyan.bold}`,
    complete: 'Rollback complete.'.bold,
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
    set: 'Updating migration status...',
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

  view: {
    add: 'Adding view: <%= view %>',
    delete: 'Deleting view: <%= view %>',
    update: 'Updating view: <%= view %>',
  },

  viewField: {
    add: 'Adding field to view: <%= view %>/<%= fieldName %>',
    move: 'Moving field in view: <%= view %>/<%= fieldName %>',
    remove: 'Removing field from view: <%= view %>/<%= fieldName %>',
    removeAll: 'Removing all fields from view: <%= view %>',
  },

  web: {
    add: 'Adding web: <%= web %>',
    delete: 'Deleting web: <%= web %>',
    update: 'Updating web: <%= web %>',
  },
};
