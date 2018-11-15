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
   * Run the command
   */
  public static async run(): Promise<void> {
    // Get status
    const status = await this.get();

    // Not installed
    if (!status.installed) {
      Log.warning({
        level: LogLevel.Warning,
        key: 'status.uninstalled',
      });
      return Log.fail();
    }

    // Show migrations
    const rows = status.migrations.map(migration => [
      File.fileName(migration.file, false),
      migration.migrated ? Log.translate('status.migrated') : Log.translate('status.pending'),
    ]);
    Log.table(rows);
  }

  /**
   * Get Engineer migration status
   */
  public static async get(): Promise<MigrationStatus> {
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
      return { installed: false };
    }

    // Getting status
    Log.info({
      level: LogLevel.Info,
      key: 'status.get',
    });

    // Get migration status
    try {
      const migrations = await SharePoint.pnp().web.lists.getByTitle(Env.lists.migrations).items.get();

      // Find intersection between migration files and list items
      const migratedStatuses: MigrationFileStatus[] = [];
      files.forEach(file => {
        const migratedStatus = { file, migrated: false };
        migrations.forEach(migration => {
          if (migration.Title === migratedStatus.file) migratedStatus.migrated = migration.Migrated;
        });
        migratedStatuses.push(migratedStatus);
      });

      // Received migration status
      return {
        installed: true,
        migrations: migratedStatuses,
      };

    // Problem getting migrations
    } catch(e) {
      return { installed: false };
    }
  }
};

interface MigrationStatus {
  installed: boolean;
  migrations?: MigrationFileStatus[];
}

interface MigrationFileStatus {
  file: string;
  migrated: boolean;
}
