import { Env } from '../config/Env';
import { File } from '../utility/File';
import { Log } from '../utility/Log';
import { LogLevel } from '@pnp/logging';
import { SharePoint } from '../utility/SharePoint';
import { appendFileSync } from 'fs';

/**
 * Get Engineer status
 */
export class Status {
  /**
   * Has status been retrieved?
   */
  public static haveStatus: boolean = false;

  /**
   * Has Engineer been installed?
   */
  public static installed: boolean = false;

  /**
   * Migration file status
   */
  public static migrations: MigrationFileStatusCollection = {};

  /**
   * Run the command
   */
  public static async run(): Promise<void> {
    // Get status
    await this.get();

    // Not installed
    if (!this.installed) {
      Log.warning({
        level: LogLevel.Warning,
        key: 'status.uninstalled',
      });
      return Log.fail();
    }

    // Show migrations
    const rows = Object.keys(this.migrations).map(file => [
      File.fileName(this.migrations[file].file, false),
      this.migrations[file].migrated ? Log.translate('status.migrated') : Log.translate('status.pending'),
    ]);
    Log.table(rows);
  }

  /**
   * Get Engineer migration status
   */
  public static async get(): Promise<void> {
    // Status has already been retrieved
    if (this.haveStatus) return;

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
      return;
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

      // Find intersection between migration files and list items
      files.forEach(file => {
        // New file status
        const fileStatus: MigrationFileStatus = {
          name: File.fileName(file, false),
          file,
          migrated: false,
          migrationId: null,
        };

        // Get migrated status from migrations list
        const fileListItem = migrationListItems.filter(listItem => listItem.Title === fileStatus.name);

        // Update file status
        if (fileListItem.length) {
          fileStatus.migrated = fileListItem[0].Migrated;
          fileStatus.migrationId = fileListItem[0].Id;
        }

        // Save file status
        this.migrations[fileStatus.name] = fileStatus;
      });

      // Save status
      this.installed = true;
      this.haveStatus = true;
    } catch(e) {
      return;
    }
  }

  /**
   * Update the Engineer migrations list
   * @param name The migration name
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
    if (!this.migrations[name] || !this.migrations[name].migrationId) {
      try {
        // New migration list item
        const newItem = await SharePoint.pnp().web.lists.getByTitle(Env.lists.migrations).items.add({
          Title: name,
          Migrated: migrated,
        });

        // Update migration list item id
        if (newItem && newItem.data && newItem.data.Id) {
          this.migrations[name].migrationId = newItem.data.Id;
        }

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
        await SharePoint.pnp().web.lists.getByTitle(Env.lists.migrations).items.getById(this.migrations[name].migrationId).update({
          Migrated: migrated,
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

interface MigrationFileStatusCollection {
  [key: string]: MigrationFileStatus;
}

interface MigrationFileStatus {
  name: string;
  file: string;
  migrated: boolean;
  migrationId: number;
}
