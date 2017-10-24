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
    info: 'Run in information mode, with increased logging',
    quiet: 'Run in quiet mode, silencing all output',
    using: 'Using config file: [c=cyan]<%= path %>[/c]',
    verbose: 'Run in verbose mode, with maximum logging',
  },

  contentType: {
    add: 'Add content type **<%= contentType %>** to **<%= target %>**',
    addAvailable: 'Add available content type **<%= contentType %>** to **<%= target %>**',
    delete: 'Delete content type **<%= contentType %>** from **<%= target %>**',
    noId: 'No manifest entry for content type **<%= contentType %>**',
    order: 'Set content type order to **<%= contentTypes %>** on **<%= target %>**',
    update: 'Update content type **<%= contentType %>** on **<%= target %>**',
  },

  error: {
    exists: '[c=yellow]already exists[/c]',
    message: '<%= code %> Error: <%= message %>',
    migrationFile: 'Error reading migration file **<%= file %>**: <%= message %>',
    step: 'Option **step** must be a valid positive number',
  },

  field: {
    add: 'Add field **<%= field %>** to **<%= target %>**',
    delete: 'Delete field **<%= field %>** from **<%= target %>**',
    update: 'Update field **<%= field %>** on **<%= target %>**',
  },

  fieldLink: {
    add: 'Add field **<%= fieldName %>** to content type **<%= contentType %>**',
    remove: 'Remove field **<%= fieldName %>** from content type **<%= contentType %>**',
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
    add: 'Add list **<%= list %>** to **<%= target %>**',
    delete: 'Delete list **<%= list %>** from **<%= target %>**',
    update: 'Update list **<%= list %>** on **<%= target %>**',
  },

  make: {
    begin: 'Create migration **<%= name %>**...',
    description: 'Create a new migration file',
  },

  manifest: {
    delete: 'Deleting manifest <%= contentType %>...',
    description: 'Show the content type ID manifest',
    empty: 'The manifest is empty',
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
    step: 'Migrate only this many files',
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
    step: 'Roll back only this many files',
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
    add: 'Add field **<%= fieldName %>** to view **<%= view %>** on **<%= target %>**',
    move: 'Moving field **<%= fieldName %>** in view **<%= view %>** on **<%= target %>**',
    remove: 'Remove field **<%= fieldName %>** from view **<%= view %>** on **<%= target %>**',
    removeAll: 'Removing all fields from view **<%= view %>** on **<%= target %>**',
  },

  web: {
    add: 'Add web **<%= web %>**',
    delete: 'Delete web **<%= web %>**',
    update: 'Update web **<%= web %>**',
  },
};
