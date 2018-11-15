import _ from 'lodash';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'fs';

/**
 * Engineer file utilities
 */
export class File {
  /**
   * Path builder
   *
   * @param path The file or folder path
   * @param cwd Relative to the current working directory? (Default: true)
   */
  public static path(path: string, cwd: boolean = true): string {
    return `${cwd ? process.cwd() : __dirname}/${_.trim(path, '/')}`;
  };

  /**
   * Does this file or folder path exist?
   *
   * @param path The file or folder path
   * @param cwd Releative to the current working directory?
   */
  public static exists(path: string, cwd: boolean = true): boolean {
    return existsSync(this.path(path, cwd));
  };

  /**
   * Create a new directory at the given path if it doesn’t already exist
   *
   * @param dir The file or folder path
   * @param cwd Relative to the current working directory? (Default: true)
   */
  public static mkdir(dir: string, cwd: boolean = true): void {
    if (!this.exists(dir, cwd)) {
      return mkdirSync(this.path(dir, cwd));
    }
  }

  /**
   * Read the contents of the file at the given path
   *
   * @param path The file path
   * @param cwd Relative to the current working directory? (Default: true)
   * @param flag File open flag for fs utility
   */
  public static read(path: string, cwd: boolean = true, flag: string = 'r'): Buffer {
    return readFileSync(this.path(path, cwd), { flag });
  }

  /**
   * Get file paths in the given directory
   *
   * @param path The folder path
   * @param cwd Relative to the current working directory? (Default: true)
   */
  public static readDir(path: string, cwd: boolean = true): string[] {
    if (!this.exists(path, cwd)) return [];
    return readdirSync(this.path(path, cwd));
  }

  /**
   * Require from the given file path
   *
   * @param path The file path
   * @param cwd Relative to the current working directory? (Default: true)
   */
  public static load(path: string, cwd: boolean = true): NodeRequire {
    if (!path || !this.exists(path, cwd)) return null;
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
  public static write(path: string, cwd: boolean = true, contents: string | Buffer, flag: string = 'wx+'): void {
    return writeFileSync(this.path(path, cwd), contents, {
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
  public static fromTemplate(template: string, path: string, cwd: boolean = true, flag: string = 'wx+'): void {
    return this.write(path, cwd, this.read(`../templates/${template}`, false), flag);
  }

  /**
   * Get the file name from the given path
   *
   * @param path The file path
   * @param ext Include file extension? (Default: true)
   */
  public static fileName(path: string, ext: boolean = true): string {
    // Pop filename from path
    let filename = path.split('/').pop();

    // Remove extension
    if (!ext) filename = filename.replace(/\.\w+$/, '');

    return filename;
  }
}
