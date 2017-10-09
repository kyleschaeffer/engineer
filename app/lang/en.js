/**
 * English (U.S.) language file
 */
module.exports = {
  app: {
    name: 'Engineer',
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

  init: {
    env: 'Creating environment config file (env.js)...',
    ignore: 'Creating ignore file (.gitignore)...',
  },

  install: {
    begin: 'Installing Engineer...\n',
    complete: 'Engineer installed.\n',
  },

  list: {
    create: 'Creating list %title%...',
    delete: 'Deleting list %title%...',
    get: 'Getting list %title%...',
    update: 'Updating list %title%...',
  },

  make: {
    begin: 'Creating migration %name%...',
  },

  migrate: {
    begin: 'Migrating %name%...\n',
    complete: 'Migration complete.\n',
    empty: 'Nothing to migrate. Use "engineer make <name>" to create a new migration.\n',
  },

  rollback: {
    begin: 'Rolling back %name%...\n',
    complete: 'Rollback complete.\n',
    empty: 'Nothing to roll back.\n',
  },

  success: {
    done: 'done.\n',
  },

  uninstall: {
    begin: 'Uninstalling Engineer...\n',
    complete: 'Engineer uninstalled.\n',
  },
};
