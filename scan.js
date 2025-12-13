const btn = document.getElementById('scanBtn');
const nameInput = document.getElementById('nameInput');
const dobInput = document.getElementById('dobInput');
const msg = document.getElementById('formMsg');
let started = false;

function start() {
  if (started) return;
  const name = (nameInput?.value || '').trim();
  const dob = dobInput?.value || '';
  if (!name || !dob) {
    if (msg) msg.textContent = 'Please enter your name and date of birth.';
    return;
  }
  if (msg) msg.textContent = '';
  started = true;
  const params = new URLSearchParams({ name, dob });
  setTimeout(() => { window.location.href = 'video.html?' + params.toString(); }, 5000);
}
if (btn) btn.addEventListener('click', start);
