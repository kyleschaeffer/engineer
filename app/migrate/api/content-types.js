const _ = require('lodash');
const bus = require('../bus');
const ContentType = require('./content-type');
const csom = require('csom-node');
const manifest = require('../manifest');
const Task = require('../task');
const utility = require('../../utility');

/**
 * Content type collection
 * @type {ContentTypes}
 */
class ContentTypes {
  /**
   * Constructor
   * @return {ContentTypes}
   */
  constructor(params = {}) {
    // Properties
    _.merge(this, {
      $parent: null,
    }, params);

    return this;
  }

  /**
   * Get content types
   * @return {pnp.ContentTypes}
   */
  get() {
    return this.$parent.get().contentTypes;
  }

  /**
   * Get content type by ID
   * @param {string} Id
   * @return {ContentType}
   */
  getById(Id) {
    return new ContentType({ $parent: this, Id });
  }

  /**
   * Get content type by name
   * @param {string} Name
   * @return {ContentType}
   */
  getByName(Name) {
    return new ContentType({ $parent: this, Name });
  }

  /**
   * Get content type by title (getByName)
   * @param {string} Title
   * @return {ContentType}
   */
  getByTitle(Title) {
    return this.getByName(Title);
  }

  /**
   * Add new content type
   * @param {Object} params
   * @return {void}
   */
  add(params = {}) {
    // Options
    const options = _.merge({
      ParentContentType: null,
      ParentContentTypeId: '0x01',
      Id: utility.sharepoint.guid(true),
      Name: null,
      Description: '',
      Group: undefined,
    }, typeof params === 'object' ? params : { Name: params });

    // Add content type
    bus.load(new Task((resolve) => {
      // Prepare content type id
      if (options.ParentContentType) options.ParentContentTypeId = this.getByName(options.ParentContentType).id();
      if (options.ParentContentType && options.Id.length === 2) options.Id = `${options.ParentContentTypeId}${options.Id}`;
      else options.Id = `${options.ParentContentTypeId}00${options.Id}`;

      // Get parents
      const parents = utility.sharepoint.getParents(this);

      // Connect, then add content type
      utility.sharepoint.configureCsom(parents.web.Url).then(() => {
        try {
          // Target web or list
          let target = csom.web;

          // Target object
          if (parents.list) target = parents.list.Title ? target.get_lists().getByTitle(parents.list.Title) : target.get_lists().getById(parents.list.Id);

          // Get content types
          const contentTypes = target.get_contentTypes();

          // Configure content type
          const contentType = new SP.ContentTypeCreationInformation(); // eslint-disable-line no-undef
          contentType.set_name(options.Name);
          contentType.set_description(options.Description || '');
          contentType.set_group(options.Group || 'Custom Content Types');
          contentType.set_id(options.Id);
          csom.ctx.load(contentTypes.add(contentType));

          // Commit
          utility.log.info({
            level: 2,
            key: 'contentType.add',
            tokens: {
              contentType: options.Name,
              target: this.$parent.Title || this.$parent.Id || utility.sharepoint.url(this.$parent.Url),
            },
          });
          csom.ctx.executeQueryAsync(() => {
            manifest.save(options.Name, options.Id).then(resolve).catch(resolve);
          }, (sender, args) => {
            utility.log.error({ content: args.get_message() });
            resolve();
          });
        }
        catch (e) {
          utility.log.error({ content: e.message });
          resolve();
        }
      });
    }));
  }

  /**
   * Add available content type
   * @param {Object} params
   * @return {void}
   */
  addAvailable(params = {}) {
    // Options
    const options = _.merge({
      Id: null,
      Name: '',
    }, typeof params === 'object' ? params : { Name: params });

    // Add content type
    bus.load(new Task((resolve) => {
      utility.log.info({
        level: 2,
        key: 'contentType.addAvailable',
        tokens: {
          contentType: options.Name || options.Id,
          target: this.$parent.Title || this.$parent.Id || utility.sharepoint.url(this.$parent.Url),
        },
      });

      // Get content type ID from manifest
      if (!options.Id && manifest.data[options.Name]) options.Id = manifest.data[options.Name].Value;

      // No Id
      if (!options.Id && options.Name) {
        utility.log.warning({
          key: 'contentType.noId',
          tokens: { contentType: options.Name },
        });
      }

      // Add content type
      this.get().addAvailableContentType(options.Id).then(resolve).catch(resolve);
    }));
  }

  /**
   * Set order of available content types
   * @param {Array} contentTypes
   * @return {void}
   */
  order(contentTypes = []) {
    bus.load(new Task((resolve) => {
      // Content type order
      const contentTypeIds = [];

      // Get content type IDs from manifest
      (typeof contentTypes === 'string' ? [contentTypes] : contentTypes).forEach((contentType) => {
        if (contentType.indexOf('0x01') === -1 && manifest.data[contentType]) contentTypeIds.push(manifest.data[contentType].Value);
        else contentTypeIds.push(contentType);
      });

      // Get parents
      const parents = utility.sharepoint.getParents(this);

      // Connect
      utility.sharepoint.configureCsom(parents.web.Url).then(() => {
        try {
          // Target list
          let target = csom.web;

          // Target object
          if (parents.list) target = parents.list.Title ? target.get_lists().getByTitle(parents.list.Title) : target.get_lists().getById(parents.list.Id);

          // Get list content types
          const listContentTypes = target.get_contentTypes();
          csom.ctx.load(listContentTypes);
          const rootFolder = target.get_rootFolder();
          csom.ctx.load(rootFolder, 'ContentTypeOrder', 'UniqueContentTypeOrder');

          // Commit
          utility.log.info({
            level: 2,
            key: 'contentType.order',
            tokens: {
              contentTypes: typeof contentTypes === 'string' ? contentTypes : contentTypes.join(', '),
              target: this.$parent.Title || this.$parent.Id || utility.sharepoint.url(this.$parent.Url),
            },
          });
          csom.ctx.executeQueryAsync(() => {
            // Set new content type order
            const newContentTypeOrder = [];

            // Get included content types
            const contentTypesEnum = listContentTypes.getEnumerator();
            while (contentTypesEnum.moveNext()) {
              // Get current content type
              const contentType = contentTypesEnum.get_current();
              const contentTypeId = contentType.get_id().toString();

              // Included content type?
              contentTypeIds.forEach((id, i) => {
                if (contentTypeId === id || contentTypeId.indexOf(`${id}00`) === 0) {
                  if (i >= newContentTypeOrder.length) newContentTypeOrder.push(contentType.get_id());
                  else newContentTypeOrder.splice(i, 0, contentType.get_id());
                }
              });
            }

            // Update root folder
            rootFolder.set_uniqueContentTypeOrder(newContentTypeOrder);
            rootFolder.update();

            // Commit
            csom.ctx.executeQueryAsync(() => {
              resolve();
            }, (sender, args) => {
              utility.log.error({ content: args.get_message() });
              resolve();
            });
          }, (sender, args) => {
            utility.log.error({ content: args.get_message() });
            resolve();
          });
        }
        catch (e) {
          utility.log.error({ content: e.message });
          resolve();
        }
      });
    }));
  }

  /**
   * Set default content type for list (order)
   * @param {string} contentType
   * @return {void}
   */
  default(contentType) {
    this.order([contentType]);
  }
}

module.exports = ContentTypes;
