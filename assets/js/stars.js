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
  return ["#ff4d4d", "#4dd2ff", "#a64dff", "#4dff88", "#ffd24d"]
    [Math.floor(Math.random() * 5)];
}

function createStar() {
  return {
    x: Math.random() * canvas.width,
    y: -20,
    prevY: -20,
    size: Math.random() * 2 + 1,
    speed: Math.random() * 3 + 2.5,
    color: randomColor(),
    opacity: Math.random() * 0.6 + 0.4
  };
}

function updateStars() {
  if (stars.length < STAR_COUNT && Math.random() < 0.15) {
    stars.push(createStar());
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach((star, i) => {
    star.prevY = star.y;
    star.y += star.speed;

    ctx.globalAlpha = star.opacity * 0.4;
    ctx.strokeStyle = star.color;
    ctx.lineWidth = star.size;
    ctx.beginPath();
    ctx.moveTo(star.x, star.prevY);
    ctx.lineTo(star.x, star.y);
    ctx.stroke();

    ctx.globalAlpha = star.opacity;
    ctx.fillStyle = star.color;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();

    if (star.y > canvas.height + 40) {
      stars.splice(i, 1);
    }
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(updateStars);
}
updateStars();

/* BLACKOUT FLASHES */
const flash = document.createElement("div");
flash.className = "flash";
document.body.appendChild(flash);

setInterval(() => {
  if (Math.random() < 0.25) {
    flash.style.opacity = "1";
    setTimeout(() => flash.style.opacity = "0", 40);
  }
}, 1800);

/* MOUSE DISTORT */
const glitch = document.querySelector(".glitch");
window.addEventListener("mousemove", e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  glitch.style.setProperty("--mx", x.toFixed(2));
  glitch.style.setProperty("--my", y.toFixed(2));
});

/* YEAR */
document.getElementById("year").textContent = new Date().getFullYear();
