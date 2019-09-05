
let dimensions = [document.documentElement.clientWidth, document.documentElement.clientHeight];

let mouseX;
let mouseY;

let radius;
const d2r = 0.0174533;

let cx;
let cy;

let prism;

let canvas;
let ctx;

let el = [];

let poly;
let poly2;

const init = () => {

  dimensions = [document.documentElement.clientWidth, document.documentElement.clientHeight];

  mouseX = dimensions[0] / 2;
  mouseY = dimensions[1] / 2;

  radius = 50;
  // const d2r = 0.0174533;

  cx = Math.sin(60 * 0.0174533) * radius;
  cy = radius * 1.5;

  prism = Math.ceil(dimensions[0] / cx);

  canvas = document.getElementById('c');
  canvas.width = dimensions[0];
  canvas.height = dimensions[1];
  ctx = canvas.getContext('2d');

  el = [];
  for (let x = 0; x < prism * prism; x++) {
    el.push([Math.random(), 0.5]);
  }

  poly = [
  Math.sin(0 * d2r) * radius, Math.cos(0 * d2r) * radius,
  Math.sin(120 * d2r) * radius, Math.cos(120 * d2r) * radius,
  Math.sin(240 * d2r) * radius, Math.cos(240 * d2r) * radius];


  poly2 = [
  Math.sin(180 * d2r) * radius, Math.cos(180 * d2r) * radius,
  Math.sin(300 * d2r) * radius, Math.cos(300 * d2r) * radius,
  Math.sin(60 * d2r) * radius, Math.cos(60 * d2r) * radius];


};

const render = t => {
  const timer = Math.sin(t * 0.01);
  ctx.clearRect(0, 0, dimensions[0], dimensions[1]);
  for (let x = 0; x < prism * prism; x++) {

    const dist = Math.hypot(mouseX - (x % prism * cx + cx / 2), mouseY - (Math.floor(x / prism) * cy + cy / 2));
    let alpha = 1 - Math.abs(dimensions[0] / 2 / dist) / 2;

    el[x][0] += 0.01 * el[x][1];
    alpha += el[x][0];

    if (el[x][0] > 1) {
      el[x][1] = -1;
    } else if (el[x][0] < 0) {
      el[x][1] = 1;
    }

    const _x = x % prism * cx;
    const _y = Math.floor(x / prism) * cy;

    ctx.fillStyle = `hsla(0,100%,100%,${alpha})`;
    ctx.beginPath();
    if (x % 2 == 0) {
      let o = radius / 2;
      ctx.moveTo(_x + poly[0], _y + poly[1] - o);
      ctx.lineTo(_x + poly[2], _y + poly[3] - o);
      ctx.lineTo(_x + poly[4], _y + poly[5] - o);
    } else {
      ctx.moveTo(_x + poly2[0], _y + poly2[1]);
      ctx.lineTo(_x + poly2[2], _y + poly2[3]);
      ctx.lineTo(_x + poly2[4], _y + poly2[5]);
    }
    ctx.closePath();
    ctx.fill();
  }

  requestAnimationFrame(render);
};

init();
render();

window.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

window.addEventListener('touchmove', e => {
  mouseX = e.touches[0].pageX;
  mouseY = e.touches[0].pageY;
});

window.addEventListener('resize', e => {
  init();
});