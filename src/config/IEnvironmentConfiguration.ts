import { IAuthOptions } from 'node-sp-auth';
import { LogLevel } from '@pnp/logging';
import { IMigration } from '../migrate/IMigration';

export interface IEnvironmentConfiguration {
  /**
   * Authentication configuration for node-sp-auth
   *
   * See https://github.com/s-KaiNet/node-sp-auth#params for all possible configuration values.
   */
  auth?: IAuthOptions;

  /**
   * Engineer install migration
   */
  install?: IMigration;

  /**
   * Language setting for string localization
   */
  lang?: string;

  /**
   * Engineer list names
   */
  lists: {
    /**
     * Engineer migrations tracking list
     */
    migrations: string;
  };

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
