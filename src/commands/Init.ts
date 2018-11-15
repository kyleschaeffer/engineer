import { Env } from '../config/Env';
import { Log } from '../utility/Log';
import { File } from '../utility/File';
import { LogLevel } from '@pnp/logging';

/**
 * Initialize Engineer project directory
 */
export class Init {
  /**
   * Run the command
   */
  public static run(): void {
    Log.info({
      level: LogLevel.Warning,
      key: 'init.begin',
    });
    Log.indent();

    // .gitignore
    Log.info({
      level: LogLevel.Warning,
      key: 'init.ignore',
      nl: false,
    });

    // Create new file
    if (!File.exists('.gitignore')) {
      File.write('.gitignore', true, '/env.js\n');
      Log.info({
        level: LogLevel.Warning,
        key: 'success.done',
      });
    }

    // Already exists
    else {
      Log.warning({
        level: LogLevel.Warning,
        key: 'error.exists',
      });
    }

    // env.js
    Log.info({
      level: LogLevel.Warning,
      key: 'init.env',
      nl: false,
    });

    // Create new file
    if (!File.exists('env.js')) {
      File.fromTemplate('env.js', 'env.js', true, 'w+');
      Log.info({
        level: LogLevel.Warning,
        key: 'success.done',
      });
    }

    // Already exists
    else {
      Log.warning({
        level: LogLevel.Warning,
        key: 'error.exists',
      });
    }

    Log.outdent();
    Log.info({
      level: LogLevel.Warning,
      key: 'init.complete',
    });
  }
};
