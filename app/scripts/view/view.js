class View {

  /**
   * Create a new view that manages the rendering of drawables.
   *
   * @param width the canvas width
   * @param height the canvas height
   */
  constructor(width, height) {
    this.ui = {
      margin: 10
    };

    this.bounds = {
      xmin: -0.5 * width,
      xmax: 0.5 * width,
      ymin: -0.5 * height,
      ymax: 0.5 * height
    };

    this._drawables = [];
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
    this._drawables.push(drawable);
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

    this._drawables.forEach(drawable => drawable.draw(p5));
  }
}
