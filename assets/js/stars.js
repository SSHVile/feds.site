const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];
const STAR_COUNT = 60; // not hella stars

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function randomColor() {
  const colors = [
    "#ff4d4d",
    "#4dd2ff",
    "#a64dff",
    "#4dff88",
    "#ffd24d"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createStar() {
  return {
    x: Math.random() * canvas.width,
    y: -10,
    size: Math.random() * 2 + 1,
    speed: Math.random() * 1.5 + 0.5,
    color: randomColor(),
    opacity: Math.random() * 0.8 + 0.2
  };
}

function updateStars() {
  if (stars.length < STAR_COUNT && Math.random() < 0.05) {
    stars.push(createStar());
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach((star, i) => {
    star.y += star.speed;

    ctx.globalAlpha = star.opacity;
    ctx.fillStyle = star.color;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();

    if (star.y > canvas.height + 10) {
      stars.splice(i, 1);
    }
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(updateStars);
}

updateStars();

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
