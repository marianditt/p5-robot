class PID {

  /**
   * Creates a PID-controller.
   *
   * @param kp the proportional factor
   * @param ki the integral factor
   * @param kd the derivative factor
   * @param threshold the distance at which the error is integrated
   */
  constructor(kp, ki, kd, threshold) {
    this._kp = kp;
    this._ki = ki;
    this._kd = kd;
    this._threshold = threshold;
    this._errSum = 0.0;
  }

  /**
   * Computes the control to pull the actual state to the desired state.
   *
   * @param vActual the actual value
   * @param dvActual the actual derivative
   * @param vDesired the desired value
   * @param dvDesired the desired derivative
   * @param diff an optional distance function of the value space
   * @param ddiff an optional distance function of the derivative space
   * @returns {number} the control suggested by the PID-controller
   */
  apply(vActual, dvActual, vDesired, dvDesired,
      diff = (a, b) => a - b,
      ddiff = (a, b) => a - b) {
    const err = diff(vDesired, vActual);
    const derr = ddiff(dvDesired, dvActual);
    this._updateErrSum(err);
    return this._kp * err + this._ki * this._errSum + this._kd * derr;
  }

  /**
   * Integrates the error if it is below the threshold.
   *
   * The integral is reset to zero, if the error exceeds the threshold.
   *
   * @param err the error to be integrated
   * @private
   */
  _updateErrSum(err) {
    if (err < this._threshold) {
      this._errSum += err;
    } else {
      this._errSum = 0.0;
    }
  }
}
