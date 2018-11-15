import { Env } from '../config/Env';
import { Log } from '../utility/Log';
import { LogLevel } from '@pnp/logging';
import { Migration } from '../migrate/Migration';
import { Status } from './Status';

/**
 * Uninstall Engineer lists
 */
export class Uninstall {
  /**
   * Run the command
   */
  public static async run(): Promise<void> {
    await this.uninstall();
  }

  /**
   * Install Engineer lists
   */
  public static async uninstall(): Promise<boolean> {
    // Get status
    const status = await Status.get();

    // Already uninstalled
    if (!status.installed) {
      Log.warning({
        level: LogLevel.Warning,
        key: 'uninstall.already',
      });
      return true;
    }

    // Uninstalling
    Log.info({
      level: LogLevel.Warning,
      key: 'uninstall.begin',
    });

    // Roll back install migration
    const installMigration = new Migration(Env.install);
    await installMigration.rollback().catch(error => Log.responseError(error));

    Log.info({
      level: LogLevel.Warning,
      key: 'uninstall.end',
    });

    return true;
  }
};
