class RobotView {
  constructor(robot) {
    this.robot = robot;
  }

  /**
   * Draws the robot at its current location and in its current orientation.
   *
   * @param p5 the rendering environment
   */
  draw(p5) {
    p5.push();
    p5.translate(this.robot.state.x, this.robot.state.y);
    p5.rotate(this.robot.state.phi);

    RobotView._drawBody(p5, this.robot.config.body);

    const offset = 0.5 * this.robot.config.body.width;
    RobotView._drawWheel(p5, -offset, this.robot.config.wheel);
    RobotView._drawWheel(p5, offset, this.robot.config.wheel);

    RobotView._drawHeading(p5, this.robot.config.body);
    p5.pop();
  }

  static _drawBody(p5, body) {
    p5.push();
    p5.rectMode(p5.CENTER);
    p5.stroke("black");
    p5.fill("white");
    p5.rect(0, 0, body.length, body.width);
    p5.pop();
  }

  static _drawWheel(p5, offset, wheel) {
    p5.push();
    p5.translate(0, offset);
    p5.rectMode(p5.RADIUS);
    p5.stroke("red");
    p5.fill("red");
    p5.rect(0, 0, wheel.radius, wheel.width);
    p5.pop();
  }

  static _drawHeading(p5, body) {
    p5.push();
    p5.strokeWeight(5);
    p5.stroke("black");
    p5.fill("black");
    p5.line(0, 0, 1.5 * body.length, 0);
    p5.pop();
  }
}
