import { File } from '../utility/File';
import { Lists } from '../services/SharePoint/Lists';
import { Log } from '../utility/Log';

/**
 * Get Engineer status
 */
export class Status {
  /**
   * Run the command
   */
  public static run(): Promise<any> {
    return new Promise((resolve, reject) => {
      // Get migration files
      Log.info({
        key: 'migrate.using',
        tokens: { path: File.path('migrations') },
      });
      const files = File.readDir('migrations');

      // No migrations
      if (!files || !files.length) {
        Log.warning({ key: 'migrate.empty' });
        return reject();
      }

      // Getting status
      Log.info({ key: 'status.get', nl: false });

      // Get status
      Lists.getAll('/').then(response => {
        Log.dump(JSON.stringify(response, null, 2));
        resolve();
      }).catch(response => reject(response));
    });
  }
};
