import { File } from '../utility/File';
import { Log } from '../utility/Log';
import { LogLevel } from '@pnp/logging';
import { Migration } from '../migrate/Migration';
import { Status } from './Status';

/**
 * Run migrations
 */
export class Migrate {
  /**
   * Migration queue
   */
  private static queue: QueuedMigration[] = [];

  /**
   * Migrate to this file name
   */
  private static migrateTo: string;

  /**
   * Steps
   */
  private static step: number;

  /**
   * Stop!
   */
  private static stop: boolean;

  /**
   * Run the command
   * @param options Migration options
   */
  public static async run(options: any): Promise<void> {
    // Get migration files
    let files = File.readDir('migrations');

    // No migrations
    if (!files || !files.length) {
      Log.warning({
        level: LogLevel.Error,
        key: 'migrate.empty',
      });
      Log.fail();
    }

    // Migrate to
    if (options.to) {
      this.migrateTo = File.fileName(options.to, false);
      if (!File.exists(`migrations/${this.migrateTo}.js`)) {
        Log.fail({
          key: 'migrate.exist',
          tokens: { file: this.migrateTo },
        });
      }
    }

    // Only
    if (options.only) {
      const onlyFile = File.fileName(options.only, false);
      if (!File.exists(`migrations/${onlyFile}.js`)) {
        Log.fail({
          key: 'migrate.exist',
          tokens: { file: onlyFile },
        });
      }
      files = [`${onlyFile}.js`];
    }

    // Step
    if (options.step) {
      const steps = parseInt(options.step, 10);
      if (!steps || steps < 1) Log.fail({ key: 'error.step' });
      this.step = steps;
    }

    // Get migration status
    await Status.get();

    // Not installed
    if (!Status.status.installed) {
      Log.error({
        level: LogLevel.Error,
        key: 'status.uninstalled',
      });
      Log.fail();
    }

    // Queue migrations
    files.forEach((file) => {
      // Get migration name
      const name = File.fileName(file, false);

      // Get migrated status
      const fileStatus = Status.status.migrations[file];

      // Not already migrated?
      if ((options.force || !fileStatus || !fileStatus.migrated) && (!this.step || this.queue.length < this.step)) {
        // Load migration file
        try {
          const data = require(`${process.cwd()}/migrations/${file}`);
          const migration = new Migration(data);

          // Add to queue
          this.queue.push({ name, migration });
        }
        catch (e) {
          Log.fail({
            key: 'error.migrationFile',
            tokens: { file, message: e.message },
          });
        }
      }
    });

    // Nothing to migrate
    if (!this.queue.length) {
      Log.warning({
        level: LogLevel.Warning,
        key: 'migrate.upToDate',
      });
      Log.fail();
    }

    // Run migrations
    await this.next();

    Log.info({
      level: LogLevel.Warning,
      key: 'migrate.complete',
    });
  }

  /**
   * Run next migration in queue
   */
  private static async next(): Promise<void> {
    // No migrations in queue
    if (!this.queue.length || this.stop) return;

    // Run next migration
    const migration = this.queue.shift();
    Log.info({
      level: LogLevel.Warning,
      key: 'migrate.begin',
      tokens: { name: migration.name },
    });
    Log.indent();

    // Migrate
    try {
      await migration.migration.migrate();
    } catch (e) {
      Log.fail(e);
    }

    // Update status
    await Status.update(migration.name, true);
    Log.outdent();

    // Migrate to
    if (this.migrateTo && this.migrateTo === migration.name) {
      this.stop = true;
      return;
    }

    // Next!
    return this.next();
  }
};

interface QueuedMigration {
  name: string;
  migration: Migration;
}
