"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const logging_1 = require("@pnp/logging");
const Env_1 = require("../config/Env");
const Lang_1 = require("../lang/Lang");
const LogMessage_1 = require("./LogMessage");
const chalk = require('chalk');
const Table = require('cli-table');
/**
 * Engineer logging utilities
 */
class Log {
    /**
     * Print the given message
     *
     * @param message The message to be printed
     * @param nl Append new line?
     */
    static print(message, nl = true) {
        process.stdout.write(`${!this.hanging ? this.indentation : ''}${message}${nl ? '\n' : ''}`);
        this.hanging = !nl;
    }
    /**
     * Dump data to the console
     *
     * @param params Data to dump to the console
     */
    static dump(...params) {
        if (this.hanging)
            this.print('', true);
        params.forEach((param) => console.log(param));
    }
    /**
     * Log tabular data
     *
     * @param rows Table rows to be logged
     */
    static table(rows) {
        const table = new Table();
        rows.forEach(row => table.push(row));
        return this.dump(table.toString());
    }
    /**
     * Log an information message
     *
     * @param options Message configuration
     */
    static info(options) {
        const message = new LogMessage_1.LogMessage(options);
        if (message.level < Env_1.Env.logLevel)
            return;
        if (message.content && typeof (message.content) !== 'string')
            return this.dump(message.content);
        this.print(message.key ? this.translate(message.key, message.tokens) : message.content, message.nl);
    }
    /**
     * Log a warning message
     *
     * @param options Message configuration
     */
    static warning(options) {
        const message = new LogMessage_1.LogMessage(options);
        if (message.level < Env_1.Env.logLevel)
            return;
        if (message.content && typeof (message.content) !== 'string')
            return this.dump(message.content);
        this.print(message.key ? chalk.yellow(this.translate(message.key, message.tokens)) : chalk.yellow(message.content), message.nl);
    }
    /**
     * Log an error message
     *
     * @param options Message configuration
     */
    static error(options) {
        const message = new LogMessage_1.LogMessage(options);
        if (message.level < Env_1.Env.logLevel)
            return;
        if (message.content && typeof (message.content) !== 'string')
            return this.dump(message.content);
        this.print(message.key ? chalk.red(this.translate(message.key, message.tokens)) : chalk.red(message.content), message.nl);
    }
    /**
     * Handle response error messages
     *
     * @param response The HTTP response
     */
    static responseError(response) {
        // Response error
        if (response.error && typeof (response.error) === 'string') {
            const error = JSON.parse(response.error);
            if (error.error && error.error.message && error.error.message.value)
                this.error(error.error.message.value);
        }
        // Authentication error
        else if (response && response.message && response.name === 'Error') {
            let code = response.message.match(/<S:Subcode>\s*<S:Value.*?>(.*)<\/S:Value>\s*<\/S:Subcode>/);
            if (code && code.length)
                code = code[1];
            let title = response.message.match(/<S:Text.*?>(.*)<\/S:Text>/);
            if (title && title.length)
                title = title[1];
            let message = response.message.match(/<psf:text>(.*)<\/psf:text>/);
            if (message && message.length)
                message = message[1];
            if (code || title || message)
                this.error({ content: `${title}: ${message}` });
            else
                this.error(response.message);
            if (code === 'wst:FailedAuthentication')
                this.fail();
        }
        // Unknown error
        else
            this.dump(chalk.red(`UNKOWN RESPONSE ERROR: (${typeof (response)})`), response);
    }
    /**
     * Increase indentation
     */
    static indent() {
        this.indentation += '  ';
    }
    /**
     * Decrease indentation
     *
     * @param reset Reset indentation to zero?
     */
    static outdent(reset = false) {
        if (reset)
            this.indentation = '';
        else
            this.indentation = this.indentation.replace(/ {2}$/, '');
    }
    /**
     * Get localized translation for the given string
     *
     * @param key The language translation key
     * @param tokens Translation replacement token names and values
     */
    static translate(key, tokens) {
        // Get translated string
        const translation = lodash_1.default.get(Lang_1.Lang, `${Env_1.Env.lang}.${key}`, lodash_1.default.get(Lang_1.Lang, `en_us.${key}`, key));
        // No translation occurred
        if (translation === key)
            return translation;
        // Replace tokens and add markdown formatting
        const template = lodash_1.default.template(translation);
        return this.md(template(tokens));
    }
    /**
     * Process markdown formatting in the given string
     *
     * @param message String that may contain markdown
     */
    static md(message) {
        // **bold**
        message = message.replace(/\*\*(.*?)\*\*/g, chalk.bold('$1'));
        // [c=color]...[/c]
        message = message.replace(/\[c=(\w+)\](.*?)\[\/c\]/g, (match, $1, $2) => chalk[$1]($2));
        return message;
    }
    /**
     * Suppress logging
     */
    static supress() {
        // Save current logging configuration
        this.oldLogLevel = Env_1.Env.logLevel;
        // Disable logging
        Env_1.Env.logLevel = 99 /* Off */;
        logging_1.Logger.activeLogLevel = 99 /* Off */;
    }
    /**
     * Restore previously suppressed logging
     */
    static restore() {
        Env_1.Env.logLevel = this.oldLogLevel;
        logging_1.Logger.activeLogLevel = this.oldLogLevel;
    }
    /**
     * End the process
     *
     * @param message Message to log before exiting
     */
    static fail(message) {
        if (message)
            this.error(message);
        process.exit();
    }
    /**
     * Subscribe to @pnp/logging events
     */
    static subscribe() {
        logging_1.Logger.subscribe(new logging_1.ConsoleListener());
        logging_1.Logger.activeLogLevel = Env_1.Env.logLevel;
    }
}
// Indentation
Log.indentation = '';
Log.hanging = false;
exports.Log = Log;
