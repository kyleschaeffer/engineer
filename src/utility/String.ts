import uuid from 'uuid';

/**
 * Engineer string utilities
 */
export class String {
  /**
   * Generate a globally unique identifier (GUID)
   *
   * @param simple Display GUID in "simple" mode? Good for working with content types
   */
  public static guid(simple: boolean = false): string {
    let guid: string = uuid();
    if (simple) guid = guid.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    return guid;
  }
}
