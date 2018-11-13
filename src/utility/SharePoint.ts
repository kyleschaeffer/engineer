import { bootstrap } from 'pnp-auth';
import { Env } from '../config/Env';
import { sp, SPRest } from '@pnp/sp';
const uuid = require('uuid');

/**
 * Engineer string utilities
 */
export class SharePoint {
  /**
   * Generate a globally unique identifier (GUID)
   *
   * @param simple Display GUID in "simple" mode? Good for working with content types
   */
  public static guid(simple: boolean = false): string {
    let guid: string = uuid();
    if (simple) guid = guid.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    return guid;
  }

  /**
   * Get an instance of PnP-JS-Core configured with authentication
   */
  public static pnp(): SPRest {
    bootstrap(sp, Env.auth, Env.site);
    return sp;
  }
}
