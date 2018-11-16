/**
 * Engineer migration
 *
 * http://sp-engineer.org/
 */
module.exports = {
  /**
   * Executed on migration activation
   *
   * @param sp SharePoint REST API
   *  - https://github.com/pnp/pnpjs/blob/dev/packages/sp/docs/index.md
   */
  async up(sp) {
    // Create lists
    await sp.web.lists.add('TestList1', 'A new list').catch(() => {});
    await sp.web.lists.add('TestList2', 'A new list').catch(() => {});
    await sp.web.lists.add('TestList3', 'A new list').catch(() => {});
  },

  /**
   * Executed on migration deactivation/rollback
   *
   * @param sp SharePoint REST API
   *  - https://github.com/pnp/pnpjs/blob/dev/packages/sp/docs/index.md
   */
  async down(sp) {
    // Delete lists
    await sp.web.lists.getByTitle('TestList1').delete().catch(() => {});
    await sp.web.lists.getByTitle('TestList2').delete().catch(() => {});
    await sp.web.lists.getByTitle('TestList3').delete().catch(() => {});
  },
};
