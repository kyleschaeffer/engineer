import _ from 'lodash';
import { ILogMessage } from './ILogMessage';
import { LogLevel } from '@pnp/logging';

/**
 * Log message
 */
export class LogMessage implements ILogMessage {
  public level: LogLevel = LogLevel.Verbose;
  public content: string = null;
  public key: string = null;
  public tokens: { [index: string]: string } = {};
  public nl: boolean = true;

  constructor(options: ILogMessage | string = {}) {
    _.merge(this, typeof(options) === 'string' ? { content: options } : options);
  }
}
