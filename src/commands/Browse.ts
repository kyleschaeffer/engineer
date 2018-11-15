import _ from 'lodash';
import { Env } from '../config/Env';
import { Log } from '../utility/Log';
import { LogLevel } from '@pnp/logging';
const opn = require('opn');

/**
 * Browse SharePoint site
 */
export class Browse {
  /**
   * Run the command
   * @param url Relative URL from site
   */
  public static run(url?: string): void {
    // Build list URI
    let path = Env.site;

    // Engineer lists
    if (url === 'migrations') path += `/Lists/${Env.lists.migrations}`;

    // Relative URL
    else if (url) path += `/${_.trim(url, '/')}`;

    // Open
    Log.info({
      level: LogLevel.Warning,
      key: 'browse.begin',
      tokens: { path },
    });

    opn(path, { wait: false });
  }
};
