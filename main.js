import { Planet, Position } from './src/solar-system';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerPosition = new Position(canvas.width / 2, canvas.height / 2);
const sun = new Planet(centerPosition, 1.1, 10, 'red', 50);
const earth = new Planet(sun.position, 2.2, 10, 'blue', 100);

const planets = [
  sun,
  earth,
  new Planet(centerPosition, 0.3, 20, 'green', 120),
  new Planet(centerPosition, 0.4, 50, 'gold', 170),
];

let planet;

const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const planetIndex in planets) {
    planet = planets[planetIndex];
    planet.move();
    planet.render(ctx);
  }
  window.requestAnimationFrame(render);
};

window.requestAnimationFrame(render);
