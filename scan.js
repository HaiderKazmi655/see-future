const btn = document.getElementById('scanBtn');
let redirected = false;
function start() {
  if (redirected) return;
  redirected = true;
  setTimeout(() => { window.location.href = 'video.html'; }, 5000);
}
if (btn) btn.addEventListener('click', start);
start();
