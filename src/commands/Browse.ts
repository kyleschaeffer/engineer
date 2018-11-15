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
   */
  public static run(list?: string): void {
    // Build list URI
    let path = Env.site;

    // Special lists
    if (list === 'migrations') path += `/Lists/${Env.lists.migrations}`;
    else if (list) path += `/Lists/${list}`;

    // Open
    Log.info({
      level: LogLevel.Warning,
      key: 'browse.begin',
      tokens: { path },
    });

    opn(path, { wait: false });
  }
};
