const _ = require('lodash');
const bus = require('../bus');
const Field = require('./field');
const Task = require('../task');

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
   * @return {ContentType}
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
      Group: null,
    }, params);

    // Field kind
    const type = options.Type;
    delete options.Type;
    options.FieldTypeKind = Field.kind(type);

    // Add field
    bus.load(new Task((resolve) => {
      this.get().add(options.Title, Field.type(type), options).then(resolve);
    }));
  }

  /**
   * Add field from XML schema
   * @param {string} xml
   */
  addXml(xml = '') {
    // Add field
    bus.load(new Task((resolve) => {
      this.get().createFieldAsXml(xml).then(resolve);
    }));
  }
}

module.exports = Fields;
