const _ = require('lodash');
const bus = require('../bus');
const Field = require('./field');
const Task = require('../task');
const utility = require('../../utility');

/**
 * Field collection
 * @type {Fields}
 */
class Fields {
  /**
   * Constructor
   * @param {Object} params
   * @return {Fields}
   */
  constructor(params = {}) {
    // Properties
    _.merge(this, {
      $parent: null,
    }, params);

    return this;
  }

  /**
   * Get fields
   * @return {pnp.Fields}
   */
  get() {
    return this.$parent.get().fields;
  }

  /**
   * Get field by ID
   * @param {string} Id
   * @return {Field}
   */
  getById(Id) {
    return new Field({ $parent: this, Id });
  }

  /**
   * Get field by title
   * @param {string} Title
   * @return {Field}
   */
  getByTitle(Title) {
    return new Field({ $parent: this, Title });
  }

  /**
   * Add field
   * @param {Object} params
   * @return {void}
   */
  add(params = {}) {
    // Options
    const options = _.merge({
      Type: 'Text',
      Title: null,
      Description: '',
      Group: undefined,
    }, typeof params === 'object' ? params : { Title: params });

    // Field kind
    const type = options.Type;
    delete options.Type;
    options.FieldTypeKind = Field.kind(type);

    // Choices
    if (options.Choices && Array.isArray(options.Choices)) {
      const results = options.Choices;
      options.Choices = {
        __metadata: {
          type: 'Collection(Edm.String)',
        },
        results,
      };
    }

    // OutputType
    if (options.OutputType && typeof options.OutputType === 'string') {
      options.OutputType = Field.kind(options.OutputType);
    }

    // Add field
    bus.load(new Task((resolve) => {
      utility.log.info('field.add', { field: options.Title });
      this.get().add(options.Title, Field.type(type), options).then(resolve).catch(resolve);
    }));
  }

  /**
   * Add field from XML schema
   * @param {string} xml
   */
  addXml(xml = '') {
    // Add field
    bus.load(new Task((resolve) => {
      utility.log.info('field.add', { field: 'XmlSchema' });
      this.get().createFieldAsXml(xml).then(resolve).catch(resolve);
    }));
  }
}

module.exports = Fields;
