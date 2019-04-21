class TractorView {

  /**
   * Creates renderings of a tractor point.
   *
   * @param tractor the provider of the tractor point
   * @param sActualFn a supplier function that provides the actual state
   * @param sDesiredFn a supplier function that provides the target state
   */
  constructor(tractor, sActualFn, sDesiredFn) {
    this._tractor = tractor;
    this._sActualFn = sActualFn;
    this._sDesiredFn = sDesiredFn;
  }

  /**
   * Draws the tractor point and the current pulling distance.
   *
   * @param p5 the rendering environment
   */
  draw(p5) {
    const sAct = this._sActualFn();
    const sDes = this._sDesiredFn();
    const tr = this._tractor.calculate(sAct, sDes);
    const r = TractorView._dist(sDes, tr);

    p5.push();
    p5.stroke("white");
    p5.fill("white");
    p5.circle(tr.x, tr.y, 2);

    p5.stroke(200);
    p5.noFill();
    p5.circle(tr.x, tr.y, r);
    p5.pop();
  }

  static _dist(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
