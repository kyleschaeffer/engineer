const amp = require('amp-utils');
const bus = require('../bus');
const sharepoint = require('../../sharepoint');
const Task = require('../task');
const utility = require('../../utility');

/**
 * View field resource methods
 * https://msdn.microsoft.com/en-us/library/dn531433.aspx#ViewFieldCollection resource
 */
module.exports = {
  /**
   * Handle onStart event
   * @param  {String} method
   * @param  {Object} tokens
   * @return {Event}
   */
  onStart(method = 'create', tokens = {}) {
    utility.log.info(`viewField.${method}`, tokens);
  },

  /**
   * Add a view field
   * @param  {Object} params
   * @return {void}
   */
  add(params = {}) {
    // Options
    const options = amp.options({
      field: '',
      list: '',
      onError: utility.error.failed,
      onStart: () => {
        this.onStart('add', {
          field: options.field,
          list: options.list,
          view: options.view,
        });
      },
      onSuccess: utility.error.success,
      site: bus.site,
      view: '',
    }, params);

    // Override: field
    if (typeof params === 'string') options.field = params;

    // Task
    const task = new Task((resolve) => {
      sharepoint.request.post({
        onError: options.onError,
        onStart: options.onStart,
        onSuccess: options.onSuccess,
        site: options.site,
        uri: `_api/web/lists/getbytitle('${options.list}')/views/getbytitle('${options.view}')/viewfields/addviewfield('${options.field}')`,
      }).then((response) => {
        resolve(response);
      });
    });
    bus.load(task);
  },

  /**
   * Remove a view field
   * @param  {Object} params
   * @return {void}
   */
  remove(params = {}) {
    // Options
    const options = amp.options({
      field: '',
      list: '',
      onError: utility.error.failed,
      onStart: () => {
        this.onStart('remove', {
          field: options.field,
          list: options.list,
          view: options.view,
        });
      },
      onSuccess: utility.error.success,
      site: bus.site,
      view: '',
    }, params);

    // Override: field
    if (typeof params === 'string') options.field = params;

    // Task
    const task = new Task((resolve) => {
      sharepoint.request.post({
        onError: options.onError,
        onStart: options.onStart,
        onSuccess: options.onSuccess,
        site: options.site,
        uri: `_api/web/lists/getbytitle('${options.list}')/views/getbytitle('${options.view}')/viewfields/removeviewfield('${options.field}')`,
      }).then((response) => {
        resolve(response);
      });
    });
    bus.load(task);
  },

  /**
   * Move a view field
   * @param  {Object} params
   * @return {void}
   */
  move(params = {}) {
    // Options
    const options = amp.options({
      field: '',
      index: 0,
      list: '',
      onError: utility.error.failed,
      onStart: () => {
        this.onStart('move', {
          field: options.field,
          list: options.list,
          view: options.view,
        });
      },
      onSuccess: utility.error.success,
      site: bus.site,
      view: '',
    }, params);

    // Override: field
    if (typeof params === 'string') options.field = params;

    // Task
    const task = new Task((resolve) => {
      sharepoint.request.post({
        body: {
          field: options.field,
          index: options.index,
        },
        onError: options.onError,
        onStart: options.onStart,
        onSuccess: options.onSuccess,
        site: options.site,
        uri: `_api/web/lists/getbytitle('${options.list}')/views/getbytitle('${options.view}')/viewfields`,
      }).then((response) => {
        resolve(response);
      });
    });
    bus.load(task);
  },
};
