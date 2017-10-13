const amp = require('amp-utils');
const bus = require('../bus');
const sharepoint = require('../../sharepoint');
const Task = require('../task');
const utility = require('../../utility');

/**
 * View resource methods
 * https://msdn.microsoft.com/en-us/library/dn531433.aspx#View resource
 */
module.exports = {
  /**
   * Create new view
   * @param  {Object} params
   * @return {void}
   */
  create(params = {}) {
    // Options
    const options = amp.options({
      list: '',
      onError: utility.error.failed,
      onStart: () => {
        utility.log.info('view.create', { list: options.list, view: options.view.Title });
      },
      onSuccess: utility.error.success,
      site: bus.site,
      view: {
        __metadata: {
          type: 'SP.View',
        },
        Title: '',
        PersonalView: false,
      },
    }, params);

    // Override: view.Title
    if (typeof params === 'string') options.view.Title = params;

    // Task
    const task = new Task((resolve) => {
      sharepoint.request.post({
        body: options.view,
        onError: options.onError,
        onStart: options.onStart,
        onSuccess: options.onSuccess,
        site: options.site,
        uri: `_api/web/lists/getbytitle('${options.list}')/views`,
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
      list: '',
      onError: utility.error.failed,
      onStart: () => {
        utility.log.info('view.update', { list: options.list, view: options.id || options.title });
      },
      onSuccess: utility.error.success,
      site: bus.site,
      title: '',
      view: {
        __metadata: {
          type: 'SP.View',
        },
      },
    }, params);

    // Override: title
    if (typeof params === 'string') options.title = params;

    // Task
    const task = new Task((resolve) => {
      sharepoint.request.update({
        body: options.view,
        onError: options.onError,
        onStart: options.onStart,
        onSuccess: options.onSuccess,
        site: options.site,
        uri: `_api/web/lists/getbytitle('${options.list}')/views${options.id ? `('${options.id}')` : `/getbytitle('${options.title}')`}`,
      }).then((response) => {
        resolve(response);
      });
    });
    bus.load(task);
  },

  /**
   * Delete a view
   * @param  {Object} params
   * @return {void}
   */
  delete(params = {}) {
    // Options
    const options = amp.options({
      id: null,
      list: '',
      onError: utility.error.failed,
      onStart: () => {
        utility.log.info('view.delete', { list: options.list, view: options.id || options.title });
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
        uri: `_api/web/lists/getbytitle('${options.list}')/views${options.id ? `('${options.id}')` : `/getbytitle('${options.title}')`}`,
      }).then((response) => {
        resolve(response);
      });
    });
    bus.load(task);
  },
};
