const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];
let w = 0, h = 0;
let reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  stars = new Array(Math.floor(w * h / 9000)).fill(0).map(() => ({
    x: Math.random() * w,
    y: Math.random() * h,
    z: Math.random() * 0.8 + 0.2,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2,
  }));
}

function step() {
  ctx.clearRect(0, 0, w, h);
  for (const s of stars) {
    s.x += s.vx; s.y += s.vy;
    if (s.x < 0) s.x += w; if (s.x >= w) s.x -= w;
    if (s.y < 0) s.y += h; if (s.y >= h) s.y -= h;
    const r = s.z * 1.5;
    ctx.beginPath();
    ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
    const alpha = 0.6 + Math.sin((s.x + s.y) * 0.002) * 0.2;
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.fill();
  }
  if (!reduceMotion) requestAnimationFrame(step);
}

window.addEventListener('resize', resize);
resize();
step();

window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
  reduceMotion = e.matches;
  step();
});

const cards = document.querySelectorAll('.card');
for (const card of cards) {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const cx = e.clientX - r.left;
    const cy = e.clientY - r.top;
    const rx = ((cy / r.height) - 0.5) * -10;
    const ry = ((cx / r.width) - 0.5) * 10;
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}

const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  hero.style.transform = `translate3d(0, ${y * -0.02}px, 0)`;
});
