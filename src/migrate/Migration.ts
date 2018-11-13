import { IMigration } from './IMigration';
import { SharePoint } from '../utility/SharePoint';

/**
 * Engineer migration
 */
export class Migration {
  /**
   * Migration config
   */
  private migration: IMigration;

  /**
   * Create migration using up/down configuration
   *
   * @param migration Migration configuration
   */
  constructor(migration: IMigration) {
    this.migration = migration;
    return this;
  }

  /**
   * Run activation/migration tasks
   */
  public migrate(): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.migration.up(SharePoint.pnp())
        .then(response => resolve(response))
        .catch(response => reject(response));
    });
  }

  /**
   * Run activation/migration tasks
   */
  public rollback(): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.migration.down(SharePoint.pnp())
        .then(response => resolve(response))
        .catch(response => reject(response));
    });
  }
}
