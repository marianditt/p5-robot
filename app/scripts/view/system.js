/**
 * Draws the coordinate systems x-axis (red), y-axis (blue), and the direction
 * of positive rotation (black arc).
 *
 * @param p5 the rendering environment
 * @param x the base x-position of the coordinate system
 * @param y the base y-position of the coordinate system
 * @param size the width and height of the coordinate system
 */
function drawSystem(p5, x, y, size) {
  function arrow(length) {
    p5.line(0, 0, length, 0);
    p5.line(length, 0, length - 0.14 * size, -0.06 * size);
  }

  function axis(length, angle) {
    p5.push();
    p5.rotate(angle);
    arrow(length);
    p5.pop();
  }

  function rotation(radius) {
    p5.push();
    p5.noFill();
    p5.arc(0, 0, 2 * radius, 2 * radius, 0.0, 3.0 * p5.HALF_PI);

    p5.rotate(3.0 * p5.HALF_PI);
    p5.translate(radius, 0);
    p5.rotate(p5.HALF_PI);
    arrow(0);
    p5.pop();
  }

  p5.push();
  p5.translate(x, y);

  p5.stroke("red");
  axis(size, 0.0);

  p5.stroke("blue");
  axis(size, p5.HALF_PI);

  p5.stroke("black");
  p5.translate(0.5 * size, 0.5 * size);
  rotation(0.3 * size);
  p5.pop();
}

/**
 * Marks the zero position with an axis aligned cross.
 *
 * @param p5 the rendering environment
 * @param radius the size of the cross measured from its center
 */
function drawSystemZero(p5, radius) {
  p5.push();
  p5.stroke(128);
  p5.line(-radius, 0, radius, 0);
  p5.line(0, -radius, 0, radius);
  p5.pop();
}
