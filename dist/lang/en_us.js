"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * English (U.S.) language translation
 */
exports.en_us = {
    app: {
        name: 'Engineer',
    },
    auth: {
        error: 'Authentication failure.',
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
        connect: 'An error occurred connecting to SharePoint',
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
        simple: 'Show GUID in simple format (good for content types)',
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
        description: 'Install Engineer tracking lists on SharePoint',
        end: '[c=green]Engineer installed.[/c]',
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
        using: 'Loading migrations from: [c=cyan]<%= path %>[/c]',
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
        failed: 'Failed updating migration status.',
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
        description: 'Delete Engineer tracking lists from SharePoint',
        end: '[c=green]Engineer uninstalled.[/c]',
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
