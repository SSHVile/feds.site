const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];
const STAR_COUNT = 60;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function randomColor() {
  return ["#ff3333", "#ff6666", "#ffaa00", "#66ccff", "#aa66ff"]
    [Math.floor(Math.random() * 5)];
}

function createStar() {
  return {
    x: Math.random() * canvas.width,
    y: -20,
    py: -20,
    size: Math.random() * 2 + 1,
    speed: Math.random() * 4 + 3,
    color: randomColor(),
    opacity: Math.random() * 0.7 + 0.3
  };
}

function loop() {
  if (stars.length < STAR_COUNT && Math.random() < 0.2) {
    stars.push(createStar());
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach((s, i) => {
    s.py = s.y;
    s.y += s.speed;

    ctx.globalAlpha = s.opacity * 0.35;
    ctx.strokeStyle = s.color;
    ctx.lineWidth = s.size;
    ctx.beginPath();
    ctx.moveTo(s.x, s.py);
    ctx.lineTo(s.x, s.y);
    ctx.stroke();

    ctx.globalAlpha = s.opacity;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fillStyle = s.color;
    ctx.fill();

    if (s.y > canvas.height + 40) stars.splice(i, 1);
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(loop);
}
loop();

/* BLACKOUT FLASH */
const flash = document.querySelector(".flash");
setInterval(() => {
  if (Math.random() < 0.35) {
    flash.style.opacity = "1";
    setTimeout(() => flash.style.opacity = "0", 50);
  }
}, 1500);

/* YEAR */
document.getElementById("year").textContent = new Date().getFullYear();
