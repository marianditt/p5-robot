class Robot {

  /**
   * Creates a new robot model.
   *
   * @param maxOmega the maximum control input of a wheel
   */
  constructor(maxOmega) {
    this.state = {
      x: 0.0,
      y: 0.0,
      phi: 0.0
    };

    this.config = {
      body: {
        length: 18,
        width: 50
      },
      wheel: {
        width: 4,
        radius: 20
      }
    };

    this._ctrl = {
      max: maxOmega,
      omegaLeft: 0.0,
      omegaRight: 0.0
    };
  }

  /**
   * @returns {{omegaLeft: number, omegaRight: number}} the current robot
   * control input
   */
  get control() {
    return {
      omegaLeft: this._ctrl.omegaLeft,
      omegaRight: this._ctrl.omegaRight
    };
  }

  /**
   * Updates the current robot control input.
   *
   * The desired control is bound to a maximum value. In case the maximum
   * control value is exceeded, the desired control is throttled. Both wheels
   * are throttled proportionally. Thus, only the desired velocity but not the
   * center of rotation is effected.
   *
   * @param control {{omegaLeft: number, omegaRight: number}} the desired robot
   * control input
   */
  set control(control) {
    const expectedMax = this._ctrl.max;
    const actualMax = Math.max(control.omegaLeft, control.omegaRight);
    const throttle =
        Math.abs(actualMax) < expectedMax ? 1.0 : this._ctrl.max / actualMax;

    // Control must be throttled proportionally. Otherwise, the trajectory and
    // not only the velocity is effected.
    this._ctrl.omegaLeft = throttle * control.omegaLeft;
    this._ctrl.omegaRight = throttle * control.omegaRight;
  }

  /**
   * Computes the robots linear and angular velocity from the current control
   * input.
   *
   * @returns {{v: number, omega: number}} the resulting linear velocity and
   * angular velocity
   */
  dirkin() {
    const w = this.config.body.width;
    const r = this.config.wheel.radius;

    const uleft = this.control.omegaLeft;
    const uright = this.control.omegaRight;

    return {
      v: 0.5 * r * (uleft + uright),
      omega: r / w * (uright - uleft)
    };
  }

  /**
   * Computes robot control values from a desired linear and angular velocity.
   *
   * @param v the desired linear velocity
   * @param omega the desired angular velocity
   * @returns {{omegaLeft: number, omegaRight: number}} the desired robot
   * control input
   */
  invkin(v, omega) {
    const w = this.config.body.width;
    const invR = 1.0 / this.config.wheel.radius;
    return {
      omegaLeft: (v - 0.5 * w * omega) * invR,
      omegaRight: (v + 0.5 * w * omega) * invR
    };
  }
}
