class TargetCtrl {

  static _INF = 1e6;
  static _TIMEOUT = 1000;

  /**
   * Generator of targets
   *
   * @param robot {Robot} the robot that chases the target
   * @param target {Robot} the target that is chased
   * @param radius the distance to the origin when the target turns around
   */
  constructor(robot, target, radius) {
    this._robot = robot;
    this._target = target;
    this._radius = radius;
    this._start = TargetCtrl._TIMEOUT;
  }

  /**
   * Spawns a new target if it is reached, otherwise steers the current target.
   */
  run() {
    if (this._hasArrived()) {
      this._spawn();
    }
    this._steer();
  }

  /**
   * Determines whether the robot arrived at the target position and
   * orientation.
   *
   * @returns {boolean} true iff the robot arrived at its target
   * @private
   */
  _hasArrived() {
    const dist = TargetCtrl._dist(this._robot.state, this._target.state);
    const angleDist = Math.abs(
        TargetCtrl._angleDist(this._robot.state, this._target.state));
    return dist < 1.0 && angleDist < 0.5 / Math.PI;
  }

  /**
   * Spawns a new target at the origin and with a random heading.
   * @private
   */
  _spawn() {
    this._target.state = {
      x: 0.0,
      y: 0.0,
      phi: TargetCtrl._random(Math.PI)
    };
  }

  /**
   * Steers the current target using different strategies.
   * @private
   */
  _steer() {
    const distToOrigin = TargetCtrl._dist(this._target.state, {x: 0.0, y: 0.0});
    if (distToOrigin < this._radius - 50.0) {
      this._steerRandomly();
    } else if (distToOrigin < this._radius) {
      this._steerStraight();
    } else {
      this._turnLeft();
    }
  }

  _steerRandomly() {
    const end = new Date().getTime();
    if (end - this._start > TargetCtrl._TIMEOUT) {
      const pStraight = 0.4;
      const random = TargetCtrl._random(1.0);
      if (Math.abs(random) < pStraight) {
        this._steerStraight();
      } else if (random < 0.0) {
        this._turnLeft();
      } else {
        this._turnRight();
      }
      this._start = end;
    }
  }

  _steerStraight() {
    this._target.control = {
      omegaLeft: TargetCtrl._INF,
      omegaRight: TargetCtrl._INF
    };
  }

  _turnLeft() {
    this._target.control = {
      omegaLeft: 0.0,
      omegaRight: TargetCtrl._INF
    };
  }

  _turnRight() {
    this._target.control = {
      omegaLeft: TargetCtrl._INF,
      omegaRight: 0.0
    };
  }

  static _dist(s1, s2) {
    const dx = s1.x - s2.x;
    const dy = s1.y - s2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  static _angleDist(s1, s2) {
    const TWO_PI = 2.0 * Math.PI;
    let d = s1.phi - s2.phi;
    while (d < -Math.PI) {
      d += TWO_PI;
    }
    while (d > Math.PI) {
      d -= TWO_PI;
    }
    return d;
  }

  static _random(range) {
    return range * (2.0 * Math.random() - 1.0);
  }
}
