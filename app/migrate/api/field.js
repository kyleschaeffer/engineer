const amp = require('amp-utils');
const bus = require('../bus');
const config = require('../../config');
const sharepoint = require('../../sharepoint');
const Task = require('../task');
const utility = require('../../utility');

/**
 * Field resource methods
 * https://msdn.microsoft.com/en-us/library/dn600182.aspx?f=255&MSPPError=-2147217396#Field resource
 */
module.exports = {
  /**
   * Create new field
   * @param  {Object} params
   * @return {void}
   */
  create(params = {}) {
    // Options
    const options = amp.options({
      field: {
        __metadata: {
          type: 'SP.Field',
        },
        Title: '',
        FieldTypeKind: 'Text',
      },
      list: null,
      onError: (response) => {
        utility.log.error('error.failed');
        utility.error.handle(response);
      },
      onStart: () => {
        utility.log.info('field.create', {
          field: options.field.Title,
          target: options.list || options.site,
        });
      },
      onSuccess: () => {
        utility.log.success('success.done');
      },
      site: bus.site,
    }, params);

    // Override: Title
    if (typeof params === 'string') options.field.Title = params;

    // Field type
    if (typeof options.field.FieldTypeKind === 'string') {
      // Metadata field type
      if (config.sharepoint.fieldTypeExceptions[options.field.FieldTypeKind]) options.field.__metadata.type = `SP.${config.sharepoint.fieldTypeExceptions[options.field.FieldTypeKind]}`;
      else options.field.__metadata.type = `SP.Field${options.field.FieldTypeKind}`;

      // FieldTypeKind
      if (config.sharepoint.fields[options.field.FieldTypeKind]) options.field.FieldTypeKind = config.sharepoint.fields[options.field.FieldTypeKind];
    }

    // Task
    const task = new Task((resolve) => {
      sharepoint.request.post({
        body: options.field,
        onError: options.onError,
        onStart: options.onStart,
        onSuccess: options.onSuccess,
        site: options.site,
        uri: `_api/web${options.list ? `/lists/getbytitle('${options.list}')` : ''}/fields`,
      }).then((response) => {
        resolve(response);
      });
    });
    bus.load(task);
  },

  /**
   * Get field data
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
      list: null,
      onStart: () => {
        utility.log.info('field.get', {
          field: options.id || options.title,
          target: options.list || options.site,
        });
      },
      onSuccess: () => {
        utility.log.success('success.done');
      },
      site: bus.site,
      title: '',
    }, params);

    // Override: Title
    if (typeof params === 'string') options.field.Title = params;

    // Task
    const task = new Task((resolve) => {
      sharepoint.request.get({
        onError: options.onError,
        onStart: options.onStart,
        onSuccess: options.onSuccess,
        site: options.site,
        uri: `_api/web${options.list ? `/lists/getbytitle('${options.list}')` : ''}/fields${options.id ? `('${options.id}')` : `/getbytitle('${options.title}')`}`,
      }).then((response) => {
        resolve(response);
      });
    });
    bus.load(task);
  },

  /**
   * Update field
   * @param  {Object} params
   * @return {void}
   */
  update(params = {}) {
    // Options
    const options = amp.options({
      id: null,
      field: {
        __metadata: {
          type: 'SP.Field',
        },
      },
      list: null,
      onError: (response) => {
        utility.log.error('error.failed');
        utility.error.handle(response);
      },
      onStart: () => {
        utility.log.info('field.update', {
          field: options.id || options.title,
          target: options.list || options.site,
        });
      },
      onSuccess: () => {
        utility.log.success('success.done');
      },
      site: bus.site,
      title: '',
    }, params);

    // Override: title
    if (typeof params === 'string') options.title = params;

    // Field type
    if (typeof options.field.FieldTypeKind === 'string') {
      // Metadata field type
      if (config.sharepoint.fieldTypeExceptions[options.field.FieldTypeKind]) options.field.__metadata.type = `SP.${config.sharepoint.fieldTypeExceptions[options.field.FieldTypeKind]}`;

      // FieldTypeKind
      if (config.sharepoint.fields[options.field.FieldTypeKind]) options.field.FieldTypeKind = config.sharepoint.fields[options.field.FieldTypeKind];
    }

    // Task
    const task = new Task((resolve) => {
      sharepoint.request.update({
        body: options.field,
        onError: options.onError,
        onStart: options.onStart,
        onSuccess: options.onSuccess,
        site: options.site,
        uri: `_api/web${options.list ? `/lists/getbytitle('${options.list}')` : ''}/fields${options.id ? `('${options.id}')` : `/getbytitle('${options.title}')`}`,
      }).then((response) => {
        resolve(response);
      });
    });
    bus.load(task);
  },

  /**
   * Delete a field
   * @param  {Object} params
   * @return {void}
   */
  delete(params = {}) {
    // Options
    const options = amp.options({
      id: null,
      list: null,
      onError: (response) => {
        utility.log.error('error.failed');
        utility.error.handle(response);
      },
      onStart: () => {
        utility.log.info('list.delete', {
          field: options.id || options.title,
          target: options.list || options.site,
        });
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
        uri: `_api/web${options.list ? `/lists/getbytitle('${options.list}')` : ''}/fields${options.id ? `('${options.id}')` : `/getbytitle('${options.title}')`}`,
      }).then((response) => {
        resolve(response);
      });
    });
    bus.load(task);
  },
};
