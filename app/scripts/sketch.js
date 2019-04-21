// Constants
const dt = 10; // [ms]
const width = 1000; // [pixel]
const height = 800; // [pixel]
const maxR = 40.0; // Maximum tractor radius
const kp = 1e3; // Proportional factor of a PID controller

// Models
const alex = new Robot(2.5 * Math.PI);
const tractor = new Tractor(maxR);
const target = new Robot(2.0 * Math.PI);

// Controls
const scheduler = new Scheduler(dt);
scheduler.addTask(new RobotController(alex, () => target.state, tractor,
    new PID(kp, 0.03 * kp, 0.0, maxR),
    new PID(30.0 * kp, 0.0, 0.0, 0.0)));
scheduler.addTask(new Simulator(alex, dt * 0.001));
scheduler.addTask(new Simulator(target, dt * 0.001));
scheduler.addTask(new TargetCtrl(alex, target, 0.5 * height - 100.0));
scheduler.start();

// Views
const view = new View(width, height);
view.addDrawable(new System(view.ui, view.bounds));
view.addDrawable(new TractorView(tractor,
    () => alex.state, () => target.state));
view.addDrawable(new RobotView(target, 0.2));
view.addDrawable(new RobotView(alex));

function callbackFor(view) {
  return p5 => {
    p5.setup = () => view.setup(p5);
    p5.draw = () => view.draw(p5)
  };
}

const canvas = new p5(callbackFor(view), "view");
