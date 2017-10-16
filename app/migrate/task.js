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
    const p = new Promise((resolve) => {
      this.exec(resolve);
    });
    return p;
  }
}

module.exports = Task;
