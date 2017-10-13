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
   * Configure options
   * @param  {Object} apiOptions
   * @return {Object}
   */
  configure(apiOptions) {
    const options = apiOptions;

    // Save field name
    if (options.field && options.field.Title) options.fieldName = options.field.Title;

    // Field type
    if (options.field && options.field.FieldTypeKind && typeof options.field.FieldTypeKind === 'string') {
      // Metadata field type
      if (config.sharepoint.fieldTypeExceptions[options.field.FieldTypeKind]) options.field.__metadata.type = `SP.${config.sharepoint.fieldTypeExceptions[options.field.FieldTypeKind]}`;
      else options.field.__metadata.type = `SP.Field${options.field.FieldTypeKind}`;

      // FieldTypeKind
      if (config.sharepoint.fields[options.field.FieldTypeKind]) options.field.FieldTypeKind = config.sharepoint.fields[options.field.FieldTypeKind];
    }

    // Choices
    if (options.field && options.field.Choices && Array.isArray(options.field.Choices)) {
      const choices = options.field.Choices;
      options.field.Choices = {
        __metadata: {
          type: 'Collection(Edm.String)',
        },
        results: choices,
        EditFormat: options.choiceRadio ? 1 : 0,
      };
    }

    return options;
  },

  /**
   * Create new field
   * @param  {Object} params
   * @return {void}
   */
  create(params = {}) {
    // Options
    let options = amp.options({
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
        utility.log.info('field.create', {
          field: options.fieldName,
          target: options.list ? utility.log.translate('list.list', { list: options.list }) : utility.log.translate('site.site', { site: options.site.length ? options.site : '/' }),
        });
      },
      onSuccess: utility.error.success,
      site: bus.site,
    }, params);

    // Override: field.Title
    if (typeof params === 'string') options.field.Title = params;

    // Configure options
    options = this.configure(options);

    // Lookup
    if (options.field.FieldTypeKind === 7) {
      // Set special metadata type
      options.field.__metadata.type = 'SP.FieldCreationInformation';

      // Move options.field to options.field.parameters for "addfield" endpoint
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
        uri: `_api/web${options.list ? `/lists/getbytitle('${options.list}')` : ''}/fields${options.field.parameters && options.field.parameters.__metadata.type === 'SP.FieldCreationInformation' ? '/addfield' : ''}`,
      }).then((response) => {
        resolve(response);
      });
    });
    bus.load(task);
  },

  /**
   * Create new field from schema XML
   * @param  {Object} params
   * @return {void}
   */
  fromSchema(params = {}) {
    // Options
    const options = amp.options({
      field: {
        __metadata: {
          type: 'SP.XmlSchemaFieldCreationInformation',
        },
        SchemaXml: '',
      },
      list: null,
      onError: utility.error.failed,
      onStart: () => {
        utility.log.info('field.create', {
          field: 'XmlSchemaField',
          target: options.list ? utility.log.translate('list.list', { list: options.list }) : utility.log.translate('site.site', { site: options.site.length ? options.site : '/' }),
        });
      },
      onSuccess: utility.error.success,
      site: bus.site,
    }, params);

    // Override: field.SchemaXml
    if (typeof params === 'string') options.field.SchemaXml = params;

    // Move options.field to options.field.parameters
    const field = amp.object.clone(options.field);
    delete options.field;
    options.field = {
      parameters: field,
    };

    // Task
    const task = new Task((resolve) => {
      sharepoint.request.post({
        body: options.field,
        onError: options.onError,
        onStart: options.onStart,
        onSuccess: options.onSuccess,
        site: options.site,
        uri: `_api/web${options.list ? `/lists/getbytitle('${options.list}')` : ''}/fields/createfieldasxml`,
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
    let options = amp.options({
      id: null,
      field: {
        __metadata: {
          type: 'SP.Field',
        },
      },
      list: null,
      onError: utility.error.failed,
      onStart: () => {
        utility.log.info('field.update', {
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

    // Configure options
    options = this.configure(options);

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
    let options = amp.options({
      id: null,
      list: null,
      onError: utility.error.failed,
      onStart: () => {
        utility.log.info('field.delete', {
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

    // Configure options
    options = this.configure(options);

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
