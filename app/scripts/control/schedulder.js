class Scheduler {

  /**
   * Creates a new scheduler that executes tasked periodically.
   *
   * @param dt the delay between successive task executions in milliseconds
   */
  constructor(dt) {
    this._dt = dt;
    this._tasks = [];
  }

  /**
   * Adds a new task.
   *
   * Tasks are executed in the order they were added. A task must provide a
   * method <code>task.run(dt)</code>, where dt is the average time in seconds
   * between successive calls.
   *
   * @param task the task to be executed periodically
   */
  addTask(task) {
    this._tasks.push(task);
  }

  /**
   * Starts the periodical execution of tasks.
   */
  start() {
    const t0 = new Date().getTime();
    this._run(t0, this._dt, 1);
  }

  _run(t0, dt, step) {
    this._tasks.forEach(task => task.run());

    // Adjust timeout such that the delta time is preserved on average. The
    // scheduler will make up the time spent on breakpoints during debugging.
    // This may result in surprising behavior.
    const elapsed = new Date().getTime() - t0;
    const timeout = Math.max(step * dt - elapsed, 0);
    setTimeout(() => this._run(t0, dt, step + 1), timeout);
  }
}
