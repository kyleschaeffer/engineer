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
   * Handle onStart event
   * @param  {String} method
   * @param  {Object} tokens
   * @return {Event}
   */
  onStart(method = 'create', tokens = {}) {
    utility.log.info(`field.${method}`, tokens);
  },

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
      onError: utility.error.failed,
      onStart: () => {
        this.onStart('create', {
          field: options.fieldName,
          target: options.list ? utility.log.translate('list.list', { list: options.list }) : utility.log.translate('site.site', { site: options.site.length ? options.site : '/' }),
        });
      },
      onSuccess: utility.error.success,
      site: bus.site,
    }, params);

    // Override: Title
    if (typeof params === 'string') options.field.Title = params;

    // Save field name
    options.fieldName = options.field.Title;

    // Field type
    if (typeof options.field.FieldTypeKind === 'string') {
      // Metadata field type
      if (config.sharepoint.fieldTypeExceptions[options.field.FieldTypeKind]) options.field.__metadata.type = `SP.${config.sharepoint.fieldTypeExceptions[options.field.FieldTypeKind]}`;
      else options.field.__metadata.type = `SP.Field${options.field.FieldTypeKind}`;

      // FieldTypeKind
      if (config.sharepoint.fields[options.field.FieldTypeKind]) options.field.FieldTypeKind = config.sharepoint.fields[options.field.FieldTypeKind];
    }

    // Lookup
    if (options.field.FieldTypeKind === 7) {
      options.field.__metadata.type = 'SP.FieldCreationInformation';
    }

    // Computed
    if (options.field.FieldTypeKind === 12) {
      options.field.__metadata.type = 'SP.XmlSchemaFieldCreationInformation';
      delete options.field.Title;
      delete options.field.FieldTypeKind;
    }

    // Choices
    if (options.field.Choices && Array.isArray(options.field.Choices)) {
      const choices = options.field.Choices;
      options.field.Choices = {
        __metadata: {
          type: 'Collection(Edm.String)',
        },
        results: choices,
        EditFormat: options.choiceRadio ? 1 : 0,
      };
    }

    // Move options.field to options.field.parameters for "addfield" and "createfieldasxml" endpoints
    if (options.field.__metadata.type === 'SP.FieldCreationInformation' || options.field.__metadata.type === 'SP.XmlSchemaFieldCreationInformation') {
      const field = amp.object.clone(options.field);
      delete options.field;
      options.field = {
        parameters: field,
      };
    }

    // Task
    const task = new Task((resolve) => {
      sharepoint.request.post({
        body: options.field,
        onError: options.onError,
        onStart: options.onStart,
        onSuccess: options.onSuccess,
        site: options.site,
        uri: `_api/web${options.list ? `/lists/getbytitle('${options.list}')` : ''}/fields${options.field.parameters && options.field.parameters.__metadata.type === 'SP.FieldCreationInformation' ? '/addfield' : ''}${options.field.parameters && options.field.parameters.__metadata.type === 'SP.XmlSchemaFieldCreationInformation' ? '/createfieldasxml' : ''}`,
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
      list: null,
      onError: utility.error.failed,
      onStart: () => {
        this.onStart('get', {
          field: options.id || options.title,
          target: options.list ? utility.log.translate('list.list', { list: options.list }) : utility.log.translate('site.site', { site: options.site.length ? options.site : '/' }),
        });
      },
      onSuccess: utility.error.success,
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
      onError: utility.error.failed,
      onStart: () => {
        this.onStart('update', {
          field: options.id || options.title,
          target: options.list ? utility.log.translate('list.list', { list: options.list }) : utility.log.translate('site.site', { site: options.site.length ? options.site : '/' }),
        });
      },
      onSuccess: utility.error.success,
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
      onError: utility.error.failed,
      onStart: () => {
        this.onStart('delete', {
          field: options.id || options.title,
          target: options.list ? utility.log.translate('list.list', { list: options.list }) : utility.log.translate('site.site', { site: options.site.length ? options.site : '/' }),
        });
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
        uri: `_api/web${options.list ? `/lists/getbytitle('${options.list}')` : ''}/fields${options.id ? `('${options.id}')` : `/getbytitle('${options.title}')`}`,
      }).then((response) => {
        resolve(response);
      });
    });
    bus.load(task);
  },
};
