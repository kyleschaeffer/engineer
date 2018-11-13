/**
 * Engineer SharePoint configuration
 */
export const SharePoint = {
  /**
   * Engineer list names
   */
  lists: {
    manifest: 'EngineerManifest',
    migrations: 'EngineerMigrations',
  },

  /**
   * SharePoint field type kinds
   * https://msdn.microsoft.com/en-us/library/microsoft.sharepoint.client.fieldtype.aspx
   */
  fields: {
    Boolean: 8,
    Calculated: 17,
    Choice: 6,
    Currency: 10,
    DateTime: 4,
    Geolocation: 31,
    Lookup: 7,
    MultiChoice: 15,
    MultiLineText: 3,
    Number: 9,
    Text: 2,
    Url: 11,
    User: 20,
  },

  /**
   * Exceptions to normal field type handling
   */
  fieldTypeExceptions: {
    Boolean: 'Field',
    Geolocation: 'Field',
  },
};
