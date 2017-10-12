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
   * Handle onStart event
   * @param  {String} method
   * @param  {Object} tokens
   * @return {Event}
   */
  onStart(method = 'create', tokens = {}) {
    utility.log.info(`list.${method}`, tokens);
  },

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
      onError: utility.error.failed,
      onStart: () => {
        this.onStart('create', { list: options.list.Title });
      },
      onSuccess: utility.error.success,
      site: bus.site,
    }, params);

    // Override: list.Title
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
      onError: utility.error.failed,
      onStart: () => {
        this.onStart('get', { list: options.id || options.title });
      },
      onSuccess: utility.error.success,
      site: bus.site,
      title: '',
    }, params);

    // Override: title
    if (typeof params === 'string') options.title = params;

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
      onError: utility.error.failed,
      onStart: () => {
        this.onStart('update', { list: options.id || options.title });
      },
      onSuccess: utility.error.success,
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
      onError: utility.error.failed,
      onStart: () => {
        this.onStart('delete', { list: options.id || options.title });
      },
      onSuccess: utility.error.success,
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
