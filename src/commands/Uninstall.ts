import { Env } from '../config/Env';
import { Log } from '../utility/Log';
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
      Log.warning({ key: 'uninstall.already' });
      return true;
    }

    // Uninstalling
    Log.info({ key: 'uninstall.begin' });
    Log.indent();

    // Roll back install migration
    const installMigration = new Migration(Env.install);
    await installMigration.rollback().catch(error => Log.responseError(error));

    return true;
  }
};
