const request = require('./request');
const utility = require('../utility');

/**
 * List resource methods
 * https://msdn.microsoft.com/en-us/library/dn531433.aspx?f=255&MSPPError=-2147217396#List resource
 * @type {Object}
 */
module.exports = {
  /**
   * Create new list
   * @param  {Object} config
   * @return {Promise}
   */
  create(params = {}) {
    // Options
    const options = utility.config.options({
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
      onStart: () => {},
      site: '',
    }, params);

    // Request
    const r = new Promise((resolve, reject) => {
      utility.log.info(`Creating list ${options.list.Title}...`);
      request.post({
        body: options.list,
        onStart: options.onStart,
        site: options.site,
        uri: '_api/web/lists',
      }).then((response) => {
        utility.log.success('done.\n');
        resolve(response);
      }).catch((response) => {
        utility.log.error('done.\n');
        reject(response);
      });
    });
    return r;
  },

  /**
   * Get list data
   * @param  {Object} config
   * @return {Promise}
   */
  get(params = {}) {
    // Options
    const options = utility.config.options({
      id: null,
      onStart: () => {},
      site: '',
      title: '',
    }, params);

    // Request
    const r = new Promise((resolve, reject) => {
      request.get({
        onStart: options.onStart,
        site: options.site,
        uri: `_api/web/lists${options.id ? `(guid'${options.id}')` : `/getbytitle('${options.title}')`}`,
      }).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(response);
      });
    });
    return r;
  },

  /**
   * Update list
   * @param  {Object} config
   * @return {Promise}
   */
  update(params = {}) {
    // Options
    const options = utility.config.options({
      id: null,
      list: {
        __metadata: {
          type: 'SP.List',
        },
      },
      onStart: () => {},
      site: '',
      title: '',
    }, params);

    // Request
    const r = new Promise((resolve, reject) => {
      request.update({
        body: options.list,
        onStart: options.onStart,
        site: options.site,
        uri: `_api/web/lists${options.id ? `(guid'${options.id}')` : `/getbytitle('${options.title}')`}`,
      }).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(response);
      });
    });
    return r;
  },

  /**
   * Delete list
   * @param  {Object} config
   * @return {Promise}
   */
  delete(params = {}) {
    // Options
    const options = utility.config.options({
      id: null,
      onStart: () => {},
      site: '',
      title: null,
    }, params);

    // Request
    const r = new Promise((resolve, reject) => {
      utility.log.info(`Deleting list ${options.title}...`);
      request.delete({
        onStart: options.onStart,
        site: options.site,
        uri: `_api/web/lists${options.id ? `(guid'${options.id}')` : `/getbytitle('${options.title}')`}`,
      }).then((response) => {
        utility.log.success('done.\n');
        resolve(response);
      }).catch((response) => {
        utility.log.error('done.\n');
        reject(response);
      });
    });
    return r;
  },
};
