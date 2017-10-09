const amp = require('amp-utils');
const bus = require('../bus');
const sharepoint = require('../../sharepoint');
const Task = require('../task');
const utility = require('../../utility');

/**
 * List resource methods
 * https://msdn.microsoft.com/en-us/library/dn531433.aspx?f=255&MSPPError=-2147217396#List resource
 */
module.exports = {
  /**
   * Create new list
   * @param  {Object} params
   * @return {void}
   */
  create(params = {}) {
    // Options
    const options = amp.options({
      list: {
        __metadata: {
          type: 'SP.List',
        },
        AllowContentTypes: true,
        BaseTemplate: 100,
        ContentTypesEnabled: true,
        Description: '',
        Title: '',
      },
      onError: (response) => {
        utility.log.error('error.failed');
        utility.error.handle(response);
      },
      onStart: () => {
        utility.log.info('list.create', { title: options.list.Title });
      },
      onSuccess: () => {
        utility.log.success('success.done');
      },
      site: bus.site,
    }, params);

    // Override: Title
    if (typeof params === 'string') options.list.Title = params;

    // Task
    const task = new Task((resolve) => {
      sharepoint.request.post({
        body: options.list,
        onError: options.onError,
        onStart: options.onStart,
        onSuccess: options.onSuccess,
        site: options.site,
        uri: '_api/web/lists',
      }).then((response) => {
        resolve(response);
      });
    });
    bus.load(task);
  },

  /**
   * Get list data
   * @param  {Object} params
   * @return {void}
   */
  get(params = {}) {
    // Options
    const options = amp.options({
      id: null,
      onError: (response) => {
        utility.log.error('error.failed');
        utility.error.handle(response);
      },
      onStart: () => {
        utility.log.info('list.get', { title: options.id || options.title });
      },
      onSuccess: () => {
        utility.log.success('success.done');
      },
      site: bus.site,
      title: '',
    }, params);

    // Override: Title
    if (typeof params === 'string') options.list.Title = params;

    // Task
    const task = new Task((resolve) => {
      sharepoint.request.get({
        onError: options.onError,
        onStart: options.onStart,
        onSuccess: options.onSuccess,
        site: options.site,
        uri: `_api/web/lists${options.id ? `(guid'${options.id}')` : `/getbytitle('${options.title}')`}`,
      }).then((response) => {
        resolve(response);
      });
    });
    bus.load(task);
  },

  /**
   * Update list
   * @param  {Object} params
   * @return {void}
   */
  update(params = {}) {
    // Options
    const options = amp.options({
      id: null,
      list: {
        __metadata: {
          type: 'SP.List',
        },
      },
      onError: (response) => {
        utility.log.error('error.failed');
        utility.error.handle(response);
      },
      onStart: () => {
        utility.log.info('list.update', { title: options.id || options.title });
      },
      onSuccess: () => {
        utility.log.success('success.done');
      },
      site: bus.site,
      title: '',
    }, params);

    // Override: title
    if (typeof params === 'string') options.title = params;

    // Task
    const task = new Task((resolve) => {
      sharepoint.request.update({
        body: options.list,
        onError: options.onError,
        onStart: options.onStart,
        onSuccess: options.onSuccess,
        site: options.site,
        uri: `_api/web/lists${options.id ? `(guid'${options.id}')` : `/getbytitle('${options.title}')`}`,
      }).then((response) => {
        resolve(response);
      });
    });
    bus.load(task);
  },

  /**
   * Delete a list
   * @param  {Object} params
   * @return {void}
   */
  delete(params = {}) {
    // Options
    const options = amp.options({
      id: null,
      onError: (response) => {
        utility.log.error('error.failed');
        utility.error.handle(response);
      },
      onStart: () => {
        utility.log.info('list.delete', { title: options.id || options.title });
      },
      onSuccess: () => {
        utility.log.success('success.done');
      },
      site: bus.site,
      title: '',
    }, params);

    // Override: title
    if (typeof params === 'string') options.title = params;

    // Task
    const task = new Task((resolve) => {
      sharepoint.request.delete({
        onError: options.onError,
        onStart: options.onStart,
        onSuccess: options.onSuccess,
        site: options.site,
        uri: `_api/web/lists${options.id ? `(guid'${options.id}')` : `/getbytitle('${options.title}')`}`,
      }).then((response) => {
        resolve(response);
      });
    });
    bus.load(task);
  },
};
