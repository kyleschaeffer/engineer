import { File } from '../utility/File';
import { Log } from '../utility/Log';
import { LogLevel } from '@pnp/logging';
import { Migration } from '../migrate/Migration';
import { Status } from './Status';

/**
 * Roll back migrations
 */
export class Rollback {
  /**
   * Migration queue
   */
  private static queue: QueuedMigration[] = [];

  /**
   * Roll back to this file name
   */
  private static rollbackTo: string;

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
        key: 'rollback.empty',
      });
      Log.fail();
    }

    // Migrate to
    if (options.to) {
      this.rollbackTo = File.fileName(options.to, false);
      if (!File.exists(`migrations/${this.rollbackTo}.js`)) {
        Log.fail({
          key: 'migrate.exist',
          tokens: { file: this.rollbackTo },
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
    if (!Status.installed) {
      Log.error({
        level: LogLevel.Error,
        key: 'status.uninstalled',
      });
      Log.fail();
    }

    // Queue migrations
    files.forEach(file => {
      // Get migration name
      const name = File.fileName(file, false);

      // Get migrated status
      const fileStatus = Status.migrations[name];

      // Not already rolled back?
      if (options.force || (fileStatus && fileStatus.migrated)) {
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

    // Truncate when stepping
    if (this.step) this.queue = this.queue.slice(this.queue.length - this.step);

    // Nothing to roll back
    if (!this.queue.length) {
      Log.warning({
        level: LogLevel.Warning,
        key: 'rollback.upToDate',
      });
      Log.fail();
    }

    // Run rollbacks
    await this.next();

    Log.info({
      level: LogLevel.Warning,
      key: 'rollback.complete',
    });
  }

  /**
   * Run next rollback in queue
   */
  private static async next(): Promise<void> {
    // No migrations in queue
    if (!this.queue.length || this.stop) return;

    // Run next rollback
    const migration = this.queue.pop();

    // Roll back to
    if (this.rollbackTo && this.rollbackTo === migration.name) {
      this.stop = true;
      return;
    }

    Log.info({
      level: LogLevel.Warning,
      key: 'rollback.begin',
      tokens: { name: migration.name },
    });
    Log.indent();

    // Roll back
    try {
      await migration.migration.rollback();
    } catch (e) {
      Log.fail(e);
    }

    // Update status
    await Status.update(migration.name, false);
    Log.outdent();

    // Next!
    return this.next();
  }
};

interface QueuedMigration {
  name: string;
  migration: Migration;
}
