import { IEnvironmentConfiguration } from './IEnvironmentConfiguration';
import { LogLevel } from '../utility/LogLevel';

/**
 * Engineer environment configuration
 */
export const Env: IEnvironmentConfiguration = {
  auth: null,
  lang: 'en_us',
  logLevel: LogLevel.Warning,
  site: '',
  stopOnError: false,
};
