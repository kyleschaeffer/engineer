import { IAuthOptions } from 'node-sp-auth';
import { LogLevel } from '../utility/LogLevel';

export interface IEnvironmentConfiguration {
  /**
   * Authentication configuration for node-sp-auth
   *
   * See https://github.com/s-KaiNet/node-sp-auth#params for all possible configuration values.
   */
  auth?: IAuthOptions;

  /**
   * Language setting for string localization
   */
  lang?: string;

  /**
   * Engineer message logging level
   */
  logLevel?: LogLevel;

  /**
   * SharePoint site URL
   */
  site?: string;

  /**
   * Halt tasks on error
   */
  stopOnError?: boolean;
}
