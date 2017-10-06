const bus = require('../bus');
const sharepoint = require('../../sharepoint');
const Task = require('../task');
const utility = require('../../utility');

module.exports = {
  /**
   * Create new list
   * @param  {Object} params
   * @return {Builder}
   */
  create: (params = {}) => {
    // Options
    const options = utility.config.options({}, params);
    if (typeof (params) === 'string') options.Title = params;

    // Task
    const task = new Task((resolve) => {
      sharepoint.list.create({
        list: options,
      }).then(() => {
        resolve();
      });
    });

    // Get on the bus
    bus.load(task);

    return this;
  },

  /**
   * Delete a list
   * @param  {Object} params
   * @return {Builder}
   */
  delete(params = {}) {
    // Options
    const options = utility.config.options({}, params);
    if (typeof (params) === 'string') options.title = params;

    // Task
    const task = new Task((resolve) => {
      sharepoint.list.delete(options).then(() => {
        resolve();
      });
    });

    // Get on the bus
    bus.load(task);

    return this;
  },
};
