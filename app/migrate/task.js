class Task {
  /**
   * New task
   * @param {Event} exec
   * @return {Task}
   */
  constructor(exec) {
    this.exec = exec;
    return this;
  }

  /**
   * Run the task
   * @return {Promise}
   */
  run() {
    return new Promise((resolve) => {
      this.exec(resolve);
    });
  }
}

module.exports = Task;
