/**
 * Renders the world in the global coordinate system.
 *
 * @param p5 the rendering environment
 */
function globalView(p5) {
  const margin = 10;
  const xmax = 300;
  const ymax = 200;

  p5.setup = function () {
    p5.createCanvas(2 * xmax, 2 * ymax);
  };

  p5.draw = function () {
    p5.background(222);

    p5.translate(0.5 * p5.width, 0.5 * p5.height);
    p5.applyMatrix(1.0, 0.0, 0.0, -1.0, 0.0, 0.0);
    drawSystem(p5, -xmax + margin, -ymax + margin, 50);

    drawSystemZero(p5, 100);
  };
}
