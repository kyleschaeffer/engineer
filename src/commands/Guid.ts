import { Log } from '../utility/Log';
import { LogLevel } from '@pnp/logging';
import { SharePoint } from '../utility/SharePoint';
const cp = require('copy-paste');

/**
 * Generate globally unique identifier (GUID)
 */
export class Guid {
  /**
   * Run the command
   * @param simple Simple mode? (Default: false)
   */
  public static run(simple: boolean = false): void {
    const guid = SharePoint.guid(simple);
    cp.copy(guid);

    Log.info({
      level: LogLevel.Warning,
      key: 'guid.complete',
    });

    Log.table([[Log.translate('guid.guid'), guid]]);
  }
};
