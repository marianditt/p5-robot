class Tractor {

  /**
   * Creates a tractor point supplier.
   *
   * @param maxr the maximum distance between the tractor point and the desired
   * position
   */
  constructor(maxr) {
    this._maxr = maxr;
  }

  /**
   * Computes the tractor point.
   *
   * The tractor point is always behind the desired position wrt. the desired
   * orientation. The distance from the actual position to the tractor point is
   * equal to the distance from the tractor point and the desired position.
   *
   * However, the distance is limited by the maximum distance between tractor
   * point and the desired position.
   *
   * @param sActual the actual state
   * @param sDesired the desired state
   * @returns {{x: number, y: number}} the position of the tractor point
   */
  calculate(sActual, sDesired) {
    const diffx = sActual.x - sDesired.x;
    const diffy = sActual.y - sDesired.y;
    const dirx = Math.cos(sDesired.phi);
    const diry = Math.sin(sDesired.phi);

    // Separate z1 and z2 to avoid division by zero.
    const z1 = Tractor._scalar(diffx, diffy, diffx, diffy);
    const z2 = 2 * Tractor._scalar(diffx, diffy, dirx, diry);

    let r = -this._maxr;
    if (z2 < 0 && z1 < -this._maxr * z2) {
      r = z1 / z2;
    }
    return {
      x: sDesired.x + r * dirx,
      y: sDesired.y + r * diry
    };
  }

  static _scalar(x1, y1, x2, y2) {
    // The scalar product.
    return x1 * x2 + y1 * y2;
  }
}
