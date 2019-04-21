class RobotView {
  /**
   * Creates renderings of a robot.
   *
   * @param robot the robot to be rendered
   * @param alpha the opacity of the robot (1.0 is fully opaque - the default)
   */
  constructor(robot, alpha = 1.0) {
    this._robot = robot;
    this._alpha = alpha;
  }

  /**
   * Draws the robot at its current location and in its current orientation.
   *
   * @param p5 the rendering environment
   */
  draw(p5) {
    p5.push();
    p5.translate(this._robot.state.x, this._robot.state.y);
    p5.rotate(this._robot.state.phi);
    p5.colorMode(p5.RGB, 255, 255, 255, 1);

    RobotView._drawBody(p5, this._robot.config.body, this._alpha);

    const offset = 0.5 * this._robot.config.body.width;
    RobotView._drawWheel(p5, -offset, this._robot.config.wheel, this._alpha);
    RobotView._drawWheel(p5, offset, this._robot.config.wheel, this._alpha);

    RobotView._drawHeading(p5, this._robot.config.body, this._alpha);
    p5.pop();
  }

  static _drawBody(p5, body, alpha) {
    p5.push();
    p5.rectMode(p5.CENTER);
    p5.stroke(0, 0, 0, alpha);
    p5.fill(255, 255, 255, alpha);
    p5.rect(0, 0, body.length, body.width);
    p5.pop();
  }

  static _drawWheel(p5, offset, wheel, alpha) {
    p5.push();
    p5.translate(0, offset);
    p5.rectMode(p5.RADIUS);
    p5.stroke(255, 0, 0, alpha);
    p5.fill(255, 0, 0, alpha);
    p5.rect(0, 0, wheel.radius, wheel.width);
    p5.pop();
  }

  static _drawHeading(p5, body, alpha) {
    p5.push();
    p5.strokeWeight(5);
    p5.stroke(0, 0, 0, alpha);
    p5.fill(0, 0, 0, alpha);
    p5.line(0, 0, 1.5 * body.length, 0);
    p5.pop();
  }
}
