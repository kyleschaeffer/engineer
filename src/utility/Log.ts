import _ from 'lodash';
import colors from 'colors/safe';
import { Env } from '../config/Env';
import { ILogMessage } from './ILogMessage';
import { Lang } from '../lang/Lang';
import { LogLevel } from './LogLevel';
import { LogMessage } from './LogMessage';
const Table = require('cli-table');

/**
 * Engineer logging utilities
 */
export class Log {
  /**
   * Print the given message
   *
   * @param message The message to be printed
   * @param nl Append new line?
   */
  private static print(message: string | Buffer, nl: boolean = true): void {
    process.stdout.write(`${!this.hanging ? this.indentation : ''}${message}${nl ? '\n' : ''}`);
    this.hanging = !nl;
  }

  /**
   * Dump data to the console
   *
   * @param params Data to dump to the console
   */
  public static dump(...params: any): void {
    if (this.hanging) this.print('', true);
    params.forEach((param: any) => console.log(param));
  }

  /**
   * Log tabular data
   *
   * @param rows Table rows to be logged
   */
  public static table(rows: any[]): void {
    const table = new Table();
    rows.forEach(row => table.push(row));
    return this.dump(table.toString());
  }

  /**
   * Log an information message
   *
   * @param options Message configuration
   */
  public static info(options: ILogMessage | string): void {
    const message = new LogMessage(options, LogLevel.Info);
    if (message.level < Env.logLevel) return;
    if (message.content && typeof(message.content) !== 'string') return this.dump(message.content);
    this.print(message.key ? this.translate(message.key, message.tokens) : message.content, message.nl);
  }

  /**
   * Log a warning message
   *
   * @param options Message configuration
   */
  public static warning(options: ILogMessage | string): void {
    const message = new LogMessage(options, LogLevel.Warning);
    if (message.level < Env.logLevel) return;
    if (message.content && typeof(message.content) !== 'string') return this.dump(message.content);
    this.print(message.key ? colors.yellow(this.translate(message.key, message.tokens)) : colors.yellow(message.content), message.nl);
  }

  /**
   * Log an error message
   *
   * @param options Message configuration
   */
  public static error(options: ILogMessage | string): void {
    const message = new LogMessage(options, LogLevel.Error);
    if (message.level < Env.logLevel) return;
    if (message.content && typeof(message.content) !== 'string') return this.dump(message.content);
    this.print(message.key ? colors.red(this.translate(message.key, message.tokens)) : colors.red(message.content), message.nl);
  }

  /**
   * Handle response error messages
   *
   * @param response The HTTP response
   */
  public static responseError(response: any): void {
    // Response error
    if (response.error && typeof(response.error) === 'string') {
      const error = JSON.parse(response.error);
      if (error.error && error.error.message && error.error.message.value) this.error(error.error.message.value);
    }

    // Authentication error
    else if (response && response.message && response.name === 'Error') {
      let code = response.message.match(/<S:Subcode>\s*<S:Value.*?>(.*)<\/S:Value>\s*<\/S:Subcode>/);
      if (code && code.length) code = code[1];
      let title = response.message.match(/<S:Text.*?>(.*)<\/S:Text>/);
      if (title && title.length) title = title[1];
      let message = response.message.match(/<psf:text>(.*)<\/psf:text>/);
      if (message && message.length) message = message[1];
      if (code || title || message) this.error({ content: `${title}: ${message}` });
      else this.error({ key: 'auth.error' });
      if (code === 'wst:FailedAuthentication') this.fail();
    }

    // Unknown error
    else this.dump(colors.red(`UNKOWN RESPONSE ERROR: (${typeof(response)})`), response);
  }

  // Indentation
  private static indentation: string = '';
  private static hanging: boolean = false;

  /**
   * Increase indentation
   */
  public static indent(): void {
    this.indentation += '  ';
  }

  /**
   * Decrease indentation
   *
   * @param reset Reset indentation to zero?
   */
  public static outdent(reset: boolean = false): void {
    if (reset) this.indentation = '';
    else this.indentation = this.indentation.replace(/ {2}$/, '');
  }

  /**
   * Get localized translation for the given string
   *
   * @param key The language translation key
   * @param tokens Translation replacement token names and values
   */
  public static translate(key: string, tokens?: { [index: string]: string }): string {
    // Get translated string
    const translation = _.get(Lang, `${Env.lang}.${key}`, _.get(Lang, `en_us.${key}`, key));

    // No translation occurred
    if (translation === key) return translation;

    // Replace tokens and add markdown formatting
    const template = _.template(translation);
    return this.md(template(tokens));
  }

  /**
   * Process markdown formatting in the given string
   *
   * @param message String that may contain markdown
   */
  public static md(message: string): string {
    const c = colors as any;

    // **bold**
    message = c.bold(message.replace(/\*\*(.*?)\*\*/g, '$1'));

    // [c=color]...[/c]
    message = message.replace(/\[c=(\w+)\](.*?)\[\/c\]/g, (match, $1, $2) => c[$1]($2));

    return message;
  }

  // Temporary storage for suppressed logging
  private static oldLogLevel: LogLevel;
  private static oldStopOnError: boolean;

  /**
   * Suppress logging
   */
  public static supress(): void {
    // Save current logging configuration
    this.oldLogLevel = Env.logLevel;
    this.oldStopOnError = Env.stopOnError;

    // Disable logging
    Env.logLevel = LogLevel.Off;
    Env.stopOnError = false;
  }

  /**
   * Restore previously suppressed logging
   */
  public static restore(): void {
    Env.logLevel = this.oldLogLevel;
    Env.stopOnError = this.oldStopOnError;
  }

  /**
   * End the process
   *
   * @param message Message to log before exiting
   */
  public static fail(message?: ILogMessage | string): void {
    if (message) this.error(message);
    process.exit();
  }
}
