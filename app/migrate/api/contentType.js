const amp = require('amp-utils');
const bus = require('../bus');
const sharepoint = require('../../sharepoint');
const Task = require('../task');
const utility = require('../../utility');

/**
 * Content type resource methods
 * Microsoft documentation not available
 */
module.exports = {
  /**
   * Configure options
   * @param  {Object} apiOptions
   * @return {Object}
   */
  configure(apiOptions) {
    const options = apiOptions;

    // Id
    if (options.contentType && options.contentType.Id && typeof options.contentType.Id === 'string') {
      const id = options.contentType.Id;
      options.contentType.Id = {
        __metadata: {
          type: 'SP.ContentTypeId',
        },
        StringValue: id,
      };
    }

    return options;
  },

  /**
   * Add a content type
   * @param  {Object} params
   * @return {void}
   */
  create(params = {}) {
    // Options
    let options = amp.options({
      contentType: {
        __metadata: {
          type: 'SP.ContentType',
        },
        Group: null,
        Name: '',
      },
      list: null,
      onError: utility.error.failed,
      onStart: () => {
        utility.log.info('contentType.create', {
          contentType: options.contentType.Name,
          target: options.list ? utility.log.translate('list.list', { list: options.list }) : utility.log.translate('site.site', { site: options.site.length ? options.site : '/' }),
        });
      },
      onSuccess: utility.error.success,
      site: bus.site,
    }, params);

    // Override: contentType.Name
    if (typeof params === 'string') options.contentType.Name = params;

    // Configure options
    options = this.configure(options);

    // Task
    const task = new Task((resolve) => {
      sharepoint.request.post({
        body: options.contentType,
        onError: options.onError,
        onStart: options.onStart,
        onSuccess: options.onSuccess,
        site: options.site,
        uri: `_api/web${options.list ? `/lists/getbytitle('${options.list}')` : ''}/contenttypes`,
      }).then((response) => {
        resolve(response);
      });
    });
    bus.load(task);
  },

  /**
   * Delete a content type
   * @param  {Object} params
   * @return {void}
   */
  delete(params = {}) {
    // Options
    const options = amp.options({
      id: '',
      list: null,
      onError: utility.error.failed,
      onStart: () => {
        utility.log.info('contentType.delete', {
          contentType: options.id,
          target: options.list ? utility.log.translate('list.list', { list: options.list }) : utility.log.translate('site.site', { site: options.site.length ? options.site : '/' }),
        });
      },
      onSuccess: utility.error.success,
      site: bus.site,
    }, params);

    // Override: id
    if (typeof params === 'string') options.id = params;

    // Task
    const task = new Task((resolve) => {
      sharepoint.request.delete({
        onError: options.onError,
        onStart: options.onStart,
        onSuccess: options.onSuccess,
        site: options.site,
        uri: `_api/web${options.list ? `/lists/getbytitle('${options.list}')` : ''}/contenttypes('${options.id}')`,
      }).then((response) => {
        resolve(response);
      });
    });
    bus.load(task);
  },
};
