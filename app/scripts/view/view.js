class View {
  constructor() {
    this.ui = {
      margin: 10
    };

    this.bounds = {
      xmin: -300,
      xmax: 300,
      ymin: -200,
      ymax: 200
    };

    this.drawables = [];
  }

  /**
   * Adds an object that will be drawn.
   *
   * Objects that are added later are drawn on top of the previously added
   * objects. An object is called a drawable if it provides a method
   * <code>drawable.draw(p5)</code>, where p5 is the rendering environment.
   *
   * @param drawable the object to be drawn
   */
  addDrawable(drawable) {
    this.drawables.push(drawable);
  }

  setup(p5) {
    const width = this.bounds.xmax - this.bounds.xmin;
    const height = this.bounds.ymax - this.bounds.ymin;
    p5.createCanvas(width, height);
  }

  draw(p5) {
    p5.translate(0.5 * p5.width, 0.5 * p5.height);
    p5.applyMatrix(1.0, 0.0, 0.0, -1.0, 0.0, 0.0);

    p5.background(222);

    this.drawables.forEach(drawable => drawable.draw(p5));
  }
}
