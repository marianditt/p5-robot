# p5 Robot
**p5 Robot** is a toy project using [p5.js](https://p5js.org/) for rendering and JavaScript to
simulate the world of **Alex** - a simple differential drive robot.

# Setup
1. Clone this repository.
1. [Download p5.js](https://p5js.org/download/), extract _p5_, and move it to ```app/scripts```
such that ```p5.js``` can be referenced as ```scripts/p5/p5.js``` from ```index.html```.
1. Open ```app/index.html``` in your favorite browser, which is Firefox.

# Project Structure
The ```scripts``` folder contains all JavaScript files. ```sketch.js``` bootstraps the application.

## scripts/view
The view package contains all classes that handle the rendering of data like the robot. View classes
depend heavily on the _p5_ rendering environment.

The rendering root is the ```view``` class that renders _drawables_ on top of each other. The view
also transforms display coordinates to world coordinates. Because of that world objects can easily
be drawn in a [right hand system](https://en.wikipedia.org/wiki/Right-hand_rule). The view also
makes sure that the canvas is redrawn periodically.

## scripts/model
The model package contains all classes that model Alex's world including the robot itself. Models
are not aware of rendering details or how they are manipulated. They just capture the state and
provide transformation methods.

## scripts/control
The control package is used for classes that manipulate models. The control loop is independent of
the frame rate of _p5_. Control classes make an effort to be as unaware of model implementation
details as possible.

The scheduler class implements the control cycle that executes control tasks periodically. The
scheduler tries to preserve units like ```[pixel/sec]``` or ```[rad/sec]``` such that kinematics can
be interpreted intuitively.
