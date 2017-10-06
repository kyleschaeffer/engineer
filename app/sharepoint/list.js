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
      onError: (response) => {
        utility.log.error('failed.\n');
        utility.error.handle(response);
      },
      onStart: () => {
        utility.log.info(`Creating list ${options.list.Title}...`);
      },
      onSuccess: () => {
        utility.log.success('done.\n');
      },
      site: '',
    }, params);

    // Request
    const r = new Promise((resolve) => {
      request.post({
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
      onError: (response) => {
        utility.log.error('failed.\n');
        utility.error.handle(response);
      },
      onStart: () => {
        utility.log.info(`Getting list ${options.id ? options.id : options.title}...`);
      },
      onSuccess: () => {
        utility.log.success('done.\n');
      },
      site: '',
      title: '',
    }, params);

    // Request
    const r = new Promise((resolve) => {
      request.get({
        onError: options.onError,
        onStart: options.onStart,
        onSuccess: options.onSuccess,
        site: options.site,
        uri: `_api/web/lists${options.id ? `(guid'${options.id}')` : `/getbytitle('${options.title}')`}`,
      }).then((response) => {
        resolve(response);
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
      onError: (response) => {
        utility.log.error('failed.\n');
        utility.error.handle(response);
      },
      onStart: () => {
        utility.log.info(`Updating list ${options.id ? options.id : options.title}...`);
      },
      onSuccess: () => {
        utility.log.success('done.\n');
      },
      site: '',
      title: '',
    }, params);

    // Request
    const r = new Promise((resolve) => {
      request.update({
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
      onError: (response) => {
        utility.log.error('failed.\n');
        utility.error.handle(response);
      },
      onStart: () => {
        utility.log.info(`Deleting list ${options.id ? options.id : options.title}...`);
      },
      onSuccess: () => {
        utility.log.success('done.\n');
      },
      site: '',
      title: null,
    }, params);

    // Request
    const r = new Promise((resolve) => {
      request.delete({
        onError: options.onError,
        onStart: options.onStart,
        onSuccess: options.onSuccess,
        site: options.site,
        uri: `_api/web/lists${options.id ? `(guid'${options.id}')` : `/getbytitle('${options.title}')`}`,
      }).then((response) => {
        resolve(response);
      });
    });
    return r;
  },
};
