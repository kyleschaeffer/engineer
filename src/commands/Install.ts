import { Env } from '../config/Env';
import { Log } from '../utility/Log';
import { LogLevel } from '@pnp/logging';
import { Migration } from '../migrate/Migration';
import { Status } from './Status';

/**
 * Install Engineer lists
 */
export class Install {
  /**
   * Run the command
   */
  public static async run(): Promise<void> {
    await this.install();
  }

  /**
   * Install Engineer lists
   */
  public static async install(): Promise<boolean> {
    // Get migration status
    await Status.get();

    // Engineer already installed
    if (Status.installed) {
      Log.warning({
        level: LogLevel.Warning,
        key: 'install.already',
      });
      return true;
    }

    // Installing
    Log.info({
      level: LogLevel.Warning,
      key: 'install.begin',
    });

    // Run install migration
    const installMigration = new Migration(Env.install);
    await installMigration.migrate().catch(error => Log.responseError(error));

    Log.info({
      level: LogLevel.Warning,
      key: 'install.end',
    });

    return true;
  }
};
