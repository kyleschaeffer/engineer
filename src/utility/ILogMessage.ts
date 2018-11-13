import { LogLevel } from '@pnp/logging';

/**
 * Log message
 */
export interface ILogMessage {
  /**
   * The log level for this message
   */
  level?: LogLevel;

  /**
   * The content of this message
   */
  content?: string;

  /**
   * The string localization key for this message
   */
  key?: string;

  /**
   * String localization token names and their values
   */
  tokens?: {
    [index: string]: string;
  };

  /**
   * Should this message append a new line?
   */
  nl?: boolean;
}
