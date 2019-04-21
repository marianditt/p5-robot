class RobotController {

  /**
   * Creates a controller that uses a tractor point and PID controllers to pull
   * the robot to its target.
   *
   * @param robot the robot to be controlled
   * @param sDesiredFn a supplier function that provides the desired state
   * @param tractor the provider of the tractor point
   * @param distPID the PID-controller to reduce distance errors
   * @param oriPID the PID-controller to reduce orientation errors
   */
  constructor(robot, sDesiredFn, tractor, distPID, oriPID) {
    this._robot = robot;
    this._sDesiredFn = sDesiredFn;
    this._tractor = tractor;
    this._distPID = distPID;
    this._oriPID = oriPID;
  }

  /**
   * Updates the robot control input.
   */
  run() {
    // The actual state and derivative.
    const sAct = this._robot.state;
    const dsAct = this._robot.dirkin();

    // The desired position is the tractor point.
    const sDes = this._sDesiredFn();
    const pDes = this._tractor.calculate(sAct, sDes);

    // The actual distance error is the distance to the tractor point.
    const dAct = RobotController._dist(sAct, pDes);

    // The desired orientation is the heading towards the tractor point.
    const phiDes = Math.atan2(pDes.y - sAct.y, pDes.x - sAct.x);

    // Apply the PID-controllers to obtain the control values.
    const v = this._distPID.apply(-dAct, dsAct.v, 0.0, 0.0);
    const omega = this._oriPID.apply(sAct.phi, dsAct.omega, phiDes, 0.0,
        RobotController._angleDist);

    // Set the control.
    this._robot.control = this._robot.invkin(v, omega);
  }

  static _dist(pActual, pDesired) {
    const dx = pDesired.x - pActual.x;
    const dy = pDesired.y - pActual.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Computes the shortest distance between two angles.
   *
   * @param a1 the first angle
   * @param a2 the second angle
   * @returns {number} the shortest angular distance
   * @private
   */
  static _angleDist(a1, a2) {
    const TWO_PI = 2.0 * Math.PI;
    let d = a1 - a2;
    while (d < -Math.PI) {
      d += TWO_PI;
    }
    while (d > Math.PI) {
      d -= TWO_PI;
    }
    return d;
  }
}
