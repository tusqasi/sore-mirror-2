import p5 from 'p5'
import Drone from './drone.js'
import PID from './pid.js'
import World from './world.js'
const s = (p) => {
	const W = 300;
	const H = 700;
	const drone_height = 200;

	// Colors
	const RED = [255, 0, 0];
	const WHITE = [255, 255, 255];
	const BLACK = [0, 0, 0];
	const GRAVITY = 1;
	const ground = H - drone_height;
	const world = new World(GRAVITY, 550, 0);
	p.altitude_controller = new PID(0.004, 0.0001, 0.3, 10, [-2, 2]);

	p.drone;
	p.swarm = [];
	p.drone_image;
	function grid() {
		for (let i = 0; i < H; i += 100) {
			p.text(i, 0, i - 5);
			p.line(0, i, W, i);
		}
	}
	p.preload = function() {
		p.drone_image = p.loadImage("./static/images/drone.png");
	}
	p.setup = function() {
		let myCanvas = p.createCanvas(W, H);
		p.background(222)
		p.line(15, 25, 600, 105);
		p.drone = new Drone(W / 2 - drone_height / 2, ground, world, p);
		p.drone_image.resize(0, drone_height);
		p.drone_image.filter(p.THRESHOLD, 0.3);
	};

	p.draw = function() {
		p.background(225);
		grid();
		p.drone.update(p.altitude_controller.update(p.drone.position.y));
		p.drone.draw(p.drone_image);
	};

};

let myp5 = new p5(s, 'myContainer');
setTimeout(() => {
	myp5.altitude_controller.setpoint = 400;
	setTimeout(() => {
		myp5.altitude_controller.setpoint = 0;
	}, 6000);
}, 4000);
export default myp5;
