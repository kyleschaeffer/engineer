"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const fs_1 = require("fs");
/**
 * Engineer file utilities
 */
class File {
    /**
     * Path builder
     *
     * @param path The file or folder path
     * @param cwd Relative to the current working directory? (Default: true)
     */
    static path(path, cwd = true) {
        return `${cwd ? process.cwd() : __dirname}/${lodash_1.default.trim(path, '/')}`;
    }
    ;
    /**
     * Does this file or folder path exist?
     *
     * @param path The file or folder path
     * @param cwd Releative to the current working directory?
     */
    static exists(path, cwd = true) {
        return fs_1.existsSync(this.path(path, cwd));
    }
    ;
    /**
     * Create a new directory at the given path if it doesn’t already exist
     *
     * @param dir The file or folder path
     * @param cwd Relative to the current working directory? (Default: true)
     */
    static mkdir(dir, cwd = true) {
        if (!this.exists(dir, cwd)) {
            return fs_1.mkdirSync(this.path(dir, cwd));
        }
    }
    /**
     * Read the contents of the file at the given path
     *
     * @param path The file path
     * @param cwd Relative to the current working directory? (Default: true)
     * @param flag File open flag for fs utility
     */
    static read(path, cwd = true, flag = 'r') {
        return fs_1.readFileSync(this.path(path, cwd), { flag });
    }
    /**
     * Get file paths in the given directory
     *
     * @param path The folder path
     * @param cwd Relative to the current working directory? (Default: true)
     */
    static readDir(path, cwd = true) {
        if (!this.exists(path, cwd))
            return [];
        return fs_1.readdirSync(this.path(path, cwd));
    }
    /**
     * Require from the given file path
     *
     * @param path The file path
     * @param cwd Relative to the current working directory? (Default: true)
     */
    static load(path, cwd = true) {
        if (!path || !this.exists(path, cwd))
            return null;
        return require(this.path(path, cwd));
    }
    /**
     * Write content to the given file path
     *
     * @param path The file path
     * @param cwd Relative to the current working directory? (Default: true)
     * @param contents File contents
     * @param flag File write flag for fs utility
     */
    static write(path, cwd = true, contents, flag = 'wx+') {
        return fs_1.writeFileSync(this.path(path, cwd), contents, {
            encoding: 'utf8',
            flag,
        });
    }
    /**
     * Create a new file from template
     *
     * @param template Template file name (must be in the "templates" folder)
     * @param path New file path
     * @param cwd Relative to the current working directory? (Default: true)
     * @param flag File write flag for fs utility
     */
    static fromTemplate(template, path, cwd = true, flag = 'wx+') {
        return this.write(path, cwd, this.read(`../templates/${template}`, false), flag);
    }
    /**
     * Get the file name from the given path
     *
     * @param path The file path
     * @param ext Include file extension? (Default: true)
     */
    static fileName(path, ext = true) {
        // Pop filename from path
        let filename = path.split('/').pop();
        // Remove extension
        if (!ext)
            filename = filename.replace(/\.\w+$/, '');
        return filename;
    }
}
exports.File = File;
