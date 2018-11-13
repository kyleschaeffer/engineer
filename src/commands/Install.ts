import { Env } from '../config/Env';
import { Log } from '../utility/Log';
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
    const status = await Status.get();

    // Engineer already installed
    if (status.installed) {
      Log.warning({ key: 'install.already' });
      return true;
    }

    // Installing
    Log.info({ key: 'install.begin' });
    Log.indent();

    // Run install migration
    const installMigration = new Migration(Env.install);
    await installMigration.migrate().catch(error => Log.responseError(error));

    return true;
  }
};
