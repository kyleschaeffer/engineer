const bus = require('../bus');
const sharepoint = require('../../sharepoint');
const Task = require('../task');
const utility = require('../../utility');

module.exports = {
  /**
   * Create new list
   * @param  {Object} params
   * @return {void}
   */
  create: (params = {}) => {
    // Options
    const options = utility.config.options({}, params);
    if (typeof (params) === 'string') options.Title = params;

    // Task
    const task = new Task((resolve) => {
      sharepoint.list.create({
        list: options,
        site: bus.site,
      }).then(() => {
        resolve();
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
    const options = utility.config.options({}, params);
    if (typeof (params) === 'string') options.title = params;
    options.site = bus.site;

    // Task
    const task = new Task((resolve) => {
      sharepoint.list.delete(options).then(() => {
        resolve();
      });
    });
    bus.load(task);
  },
};
