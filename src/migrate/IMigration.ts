import { SPRest } from '@pnp/sp';

/**
 * Engineer migration
 */
export interface IMigration {
  /**
   * Configure tasks that are executed on migration activation
   *
   * @param sp SharePoint REST API access via PnP-JS-Core (https://github.com/pnp/pnpjs/blob/dev/packages/sp/docs/index.md)
   */
  up(sp: SPRest): Promise<any>;

  /**
   * Configure tasks that are executed on migration deactivation/rollback
   *
   * @param sp SharePoint REST API access via PnP-JS-Core (https://github.com/pnp/pnpjs/blob/dev/packages/sp/docs/index.md)
   */
  down(sp: SPRest): Promise<any>;
}
