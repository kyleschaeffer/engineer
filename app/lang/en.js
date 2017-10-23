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
            |___/                        \n`,
  },

  auth: {
    csom: 'Some operations are not supported using the authentication credentials you provided. You must use either user credentials (SAML) or add-in credentials (client ID and secret ID) to use some features of Engineer.',
  },

  browse: {
    begin: 'Opening **<%= path %>**...',
    description: 'Browse SharePoint site',
  },

  config: {
    description: 'Path to configuration file if not using **env.js**',
    failed: 'Failed to load config file: **<%= path %>**\n[c=white]Use **engineer init** to create a new config file.[/c]',
    using: 'Using config file: [c=cyan]<%= path %>[/c]',
  },

  contentType: {
    add: 'Add content type **<%= contentType %>**',
    delete: 'Delete content type **<%= contentType %>**',
    update: 'Update content type **<%= contentType %>**',
  },

  error: {
    exists: '[c=yellow]already exists[/c]',
    message: '<%= code %> Error: <%= message %>',
  },

  field: {
    add: 'Add field **<%= field %>**',
    delete: 'Delete field **<%= field %>**',
    update: 'Update field **<%= field %>**',
  },

  fieldLink: {
    add: 'Add field link **<%= fieldLink %>**',
    remove: 'Remove field link **<%= fieldLink %>**',
  },

  guid: {
    complete: 'This GUID has been copied to your clipboard.',
    description: 'Generate a random GUID string',
    guid: 'GUID:',
  },

  init: {
    begin: 'Initializing Engineer...',
    complete: 'Use **engineer make <name>** to create your first migration.',
    description: 'Create **env.js** in the current directory',
    env: '+ **env.js**...',
    ignore: '+ **.gitignore**...',
  },

  install: {
    already: 'Engineer is already installed.',
    begin: 'Installing Engineer...',
    complete: '[c=green]Engineer installed.[/c]',
    description: 'Install Engineer tracking lists on SharePoint',
  },

  list: {
    add: 'Add list **<%= list %>**',
    delete: 'Delete list **<%= list %>**',
    update: 'Update list **<%= list %>**',
  },

  make: {
    begin: 'Create migration **<%= name %>**...',
    description: 'Create a new migration file',
  },

  manifest: {
    get: 'Getting manifest...',
    set: 'Updating manifest <%= contentType %>...',
  },

  migrate: {
    begin: 'Migrating **[c=cyan]<%= name %>[/c]**',
    complete: '[c=green]Migration complete.[/c]',
    count: '[c=gray][<%= current %>/<%= total %>][/c] ',
    description: 'Run pending migrations',
    empty: 'Nothing to migrate. Use **engineer make <name>** to create a new migration.',
    exist: 'Migration file does not exist: **<%= file %>**',
    force: 'Run migrations even if they\'re already migrated',
    only: 'Migrate only this file',
    to: 'Migrate up to this file, but don\'t run later migrations',
    upToDate: 'Migrations are already up to date.',
  },

  rollback: {
    begin: 'Rolling back **[c=cyan]<%= name %>[/c]**',
    complete: '[c=green]Rollback complete.[/c]',
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
    migrated: '[c=green]Migrated[/c]',
    pending: '[c=yellow]Pending[/c]',
    set: 'Updating migration status...',
    uninstalled: 'Engineer is not installed. Use **engineer install** to begin.',
  },

  success: {
    done: '[c=green]done[/c]',
  },

  uninstall: {
    already: 'Engineer is already uninstalled.',
    begin: 'Uninstalling Engineer...',
    complete: '[c=green]Engineer uninstalled.[/c]',
    description: 'Delete Engineer tracking lists from SharePoint',
  },

  view: {
    add: 'Add view **<%= view %>**',
    delete: 'Delete view **<%= view %>**',
    update: 'Update view **<%= view %>**',
  },

  viewField: {
    add: 'Add field **<%= fieldName %>** to view **<%= view %>**',
    move: 'Moving field **<%= fieldName %>** in view **<%= view %>**',
    remove: 'Remove field **<%= fieldName %>** from view **<%= view %>**',
    removeAll: 'Removing all fields from view **<%= view %>**',
  },

  web: {
    add: 'Add web **<%= web %>**',
    delete: 'Delete web **<%= web %>**',
    update: 'Update web **<%= web %>**e',
  },
};
