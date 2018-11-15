import _ from 'lodash';
import { Env } from '../config/Env';
import { File } from '../utility/File';
import { Log } from '../utility/Log';
import { LogLevel } from '@pnp/logging';
import moment from 'moment';

/**
 * Create new migration file
 */
export class Make {
  /**
   * Run the command
   * @param name Migration file name (will be kebab-cased)
   */
  public static run(name: string = 'New Migration'): void {
    // Create migration
    Log.info({
      level: LogLevel.Warning,
      key: 'make.begin',
      tokens: { name },
      nl: false,
    });

    // Create migrations directory
    File.mkdir('migrations');

    // Generate timestamped file path
    const path = `migrations/${moment().utc().format('YYYYMMDDHHmmss')}-${_.kebabCase(name)}.js`;

    // Write file from template
    File.fromTemplate('migration.js', path);
    Log.info({
      level: LogLevel.Warning,
      key: 'success.done',
    });
    Log.indent();
    Log.info({
      level: LogLevel.Warning,
      key: 'make.file',
      tokens: { path },
    });
  }
};
