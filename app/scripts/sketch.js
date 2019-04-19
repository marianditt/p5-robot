// Models
const alex = new Robot();

// Controls
const scheduler = new Scheduler(10);
scheduler.addTask({run: controlFF});
scheduler.start();

// Controls: Dummy feed forward controller until we have something better.
function controlFF(dt) {
  const desiredV = 100.0; // [pixel/sec]
  const desiredOmega = 0.5 * Math.PI; // [rad/sec]
  alex.control = alex.invkin(desiredV, desiredOmega);

  const ds = alex.dirkin();
  alex.move(
      dt * ds.v * Math.cos(alex.state.phi),
      dt * ds.v * Math.sin(alex.state.phi),
      dt * ds.omega);
}

// Views
const globalView = new View();
globalView.addDrawable(new System(globalView.ui, globalView.bounds));
globalView.addDrawable(new RobotView(alex));

function callbackFor(view) {
  return p5 => {
    p5.setup = () => view.setup(p5);
    p5.draw = () => view.draw(p5)
  };
}

const canvas = new p5(callbackFor(globalView), "global-system");
