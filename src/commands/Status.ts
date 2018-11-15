import { Env } from '../config/Env';
import { File } from '../utility/File';
import { Log } from '../utility/Log';
import { LogLevel } from '@pnp/logging';
import { SharePoint } from '../utility/SharePoint';

/**
 * Get Engineer status
 */
export class Status {
  /**
   * Cached migration status
   */
  public static status: MigrationStatus;

  /**
   * Run the command
   */
  public static async run(): Promise<void> {
    // Get status
    await this.get();

    // Not installed
    if (!this.status.installed) {
      Log.warning({
        level: LogLevel.Warning,
        key: 'status.uninstalled',
      });
      return Log.fail();
    }

    // Show migrations
    const rows = Object.keys(this.status.migrations).map(file => [
      File.fileName(this.status.migrations[file].file, false),
      this.status.migrations[file].migrated ? Log.translate('status.migrated') : Log.translate('status.pending'),
    ]);
    Log.table(rows);
  }

  /**
   * Get Engineer migration status
   */
  public static async get(): Promise<void> {
    // Status is cached
    if (this.status) return;

    // Get migration files
    Log.info({
      level: LogLevel.Info,
      key: 'migrate.using',
      tokens: { path: File.path('migrations') },
    });
    const files = File.readDir('migrations');

    // No migrations
    if (!files || !files.length) {
      Log.warning({
        level: LogLevel.Warning,
        key: 'migrate.empty',
      });
      this.status = { installed: false };
    }

    // Getting status
    Log.info({
      level: LogLevel.Info,
      key: 'status.get',
    });

    // Get migration status
    try {
      // Get migration list items
      const migrationListItems = await SharePoint.pnp().web.lists.getByTitle(Env.lists.migrations).items.get();

      // Create new status collection
      const migrations: MigrationFileStatusCollection = {};

      // Find intersection between migration files and list items
      files.forEach(file => {
        // New file status
        const fileStatus: MigrationFileStatus = {
          file,
          migrated: false,
          migrationId: null,
        };

        // Get migrated status from migrations list
        const fileListItem = migrationListItems.filter(listItem => listItem.Title == File.fileName(file, false));

        // Update file status
        if (fileListItem.length) {
          fileStatus.migrated = fileListItem[0].Migrated;
          fileStatus.migrationId = fileListItem[0].Id;
        }

        // Save file status
        migrations[file] = fileStatus;
      });

      // Set status
      this.status = {
        installed: true,
        migrations,
      };
    } catch(e) {
      // Problem getting status
      this.status = { installed: false };
    }
  }

  /**
   * Update the Engineer migrations list
   * @param name The migration file name
   * @param migrated New migrated status
   */
  public static async update(name: string, migrated: boolean): Promise<boolean> {
    // Get migration
    Log.info({
      level: LogLevel.Info,
      key: 'status.set',
      tokens: { migration: name },
    });

    // Get migration status
    await this.get();

    // Create new status
    if (!this.status.migrations[name] || !this.status.migrations[name].migrationId) {
      try {
        // New migration list item
        const newItem = await SharePoint.pnp().web.lists.getByTitle(Env.lists.migrations).items.add({
          Title: name,
          Migrated: migrated,
        });

        // Update migration list item id
        if (newItem && newItem.data && newItem.data.Id) {
          this.status.migrations[name] = newItem.data.Id;
        }

        Log.info({
          level: LogLevel.Warning,
          key: 'success.done',
        });

        return true;
      } catch (e) {
        // Failed to create new list item
        Log.warning({
          level: LogLevel.Warning,
          key: 'status.failed',
        });
        return false;
      }
    }

    // Update status
    else {
      try {
        // Update migration list item
        await SharePoint.pnp().web.lists.getByTitle(Env.lists.migrations).items.getById(this.status.migrations[name].migrationId).update({
          Migrated: migrated,
        });

        Log.info({
          level: LogLevel.Warning,
          key: 'success.done',
        });

        return true;
      } catch (e) {
        Log.warning({
          level: LogLevel.Warning,
          key: 'status.failed',
        });
        Log.error(e);

        return false;
      }
    }
  }
};

interface MigrationStatus {
  installed: boolean;
  migrations?: MigrationFileStatusCollection;
}

interface MigrationFileStatusCollection {
  [key: string]: MigrationFileStatus;
}

interface MigrationFileStatus {
  file: string;
  migrated: boolean;
  migrationId: number;
}
