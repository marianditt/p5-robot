class Simulator {

  /**
   * Creates a robot simulation.
   *
   * @param robot the robot to be simulated
   * @param dt the time step between successive iterations
   */
  constructor(robot, dt) {
    this._robot = robot;
    this._dt = dt;
  }

  /**
   * Runs a simulation iteration.
   *
   * The dynamic differential equation of the robot is integrated using Newton's
   * method.
   */
  run() {
    const s = this._robot.state;
    const ds = this._robot.dirkin();
    this._robot.state.x += this._dt * ds.v * Math.cos(s.phi);
    this._robot.state.y += this._dt * ds.v * Math.sin(s.phi);
    this._robot.state.phi += this._dt * ds.omega;
  }
}
