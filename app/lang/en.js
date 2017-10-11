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
    begin: 'Authenticating to %site%...',
    context: 'Getting context...',
    error: 'failed.\n%title%: %message%\n',
  },

  browse: {
    begin: 'Opening %path% in web browser...\n',
  },

  config: {
    failed: 'Failed to load config file: %path%. Use "engineer init" to create a new config file.',
    using: 'Using config file %path%.\n',
  },

  error: {
    exists: 'already exists.\n',
    failed: 'failed.\n',
    message: 'Error (%code%): %message%\n',
  },

  field: {
    create: 'Creating field %field% on %target%...',
    delete: 'Deleting field %field% on %target%...',
    get: 'Getting field %field% on %target%...',
    update: 'Updating field %field% on %target%...',
  },

  init: {
    env: 'Creating environment config file (env.js)...',
    ignore: 'Creating ignore file (.gitignore)...',
  },

  install: {
    begin: 'Installing Engineer...\n',
    complete: 'Engineer installed.\n',
  },

  list: {
    create: 'Creating list %list%...',
    delete: 'Deleting list %list%...',
    get: 'Getting list %list%...',
    update: 'Updating list %list%...',
  },

  make: {
    begin: 'Creating migration %name%...',
  },

  migrate: {
    begin: 'Migrating %name%...\n',
    complete: 'Migration complete.\n',
    empty: 'Nothing to migrate. Use "engineer make <name>" to create a new migration.\n',
    upToDate: 'Migrations are already up to date.\n',
  },

  rollback: {
    begin: 'Rolling back %name%...\n',
    complete: 'Rollback complete.\n',
    empty: 'Nothing to roll back.\n',
    upToDate: 'Migrations are already rolled back.\n',
  },

  status: {
    get: 'Getting migration status...',
    migrated: 'migrated\n',
    migration: '%migration%: ',
    pending: 'pending\n',
    set: 'Setting migration status for %migration%...',
    uninstalled: 'Engineer is not installed. Use "engineer install" to begin.\n',
  },

  success: {
    done: 'done.\n',
  },

  uninstall: {
    begin: 'Uninstalling Engineer...\n',
    complete: 'Engineer uninstalled.\n',
  },

  view: {
    create: 'Creating view %view% on %list%...',
    delete: 'Deleting view %view% on %list%...',
    get: 'Getting view %view% on %list%...',
    update: 'Updating view %view% on %list%...',
  },

  viewField: {
    add: 'Adding field %field% to view %view% on %list%...',
    move: 'Moving field %field% in view %view% on %list%...',
  },
};
