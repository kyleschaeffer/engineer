import { IEnvironmentConfiguration } from './IEnvironmentConfiguration';
import { InstallMigration } from './InstallMigration';
import { LogLevel } from '@pnp/logging';

/**
 * Engineer environment configuration
 */
export const Env: IEnvironmentConfiguration = {
  auth: null,
  install: InstallMigration,
  lang: 'en_us',
  lists: { migrations: 'EngineerMigrations' },
  logLevel: LogLevel.Warning,
  site: '',
  stopOnError: false,
};
