// ── Helpers ──────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Error helper ─────────────────────────────────────────────
function setError(wrapId, errId, show, msg) {
  const wrap = $(wrapId);
  const err  = $(errId);

  if (show) {
    wrap.classList.add('error');
    err.classList.add('visible');
    if (msg) err.querySelector('span').textContent = msg;
  } else {
    wrap.classList.remove('error');
    err.classList.remove('visible');
  }
}

// ── Password show / hide toggle ──────────────────────────────
$('eyeToggle').addEventListener('click', () => {
  const pw   = $('password');
  const show = pw.type === 'password';

  pw.type = show ? 'text' : 'password';
  $('eyeOpen').style.display   = show ? 'none' : '';
  $('eyeClosed').style.display = show ? ''     : 'none';
  $('eyeToggle').setAttribute('aria-label', show ? 'Hide password' : 'Show password');
});

// ── Live validation ───────────────────────────────────────────
$('email').addEventListener('input', () => {
  setError(
    'emailWrap', 'emailError',
    $('email').value && !EMAIL_RE.test($('email').value),
    'Please enter a valid email address.'
  );
});

$('password').addEventListener('input', () => {
  setError(
    'passwordWrap', 'passwordError',
    $('password').value && $('password').value.length < 6,
    'Password must be at least 6 characters.'
  );
});

// ── Form submission ───────────────────────────────────────────
$('loginForm').addEventListener('submit', async e => {
  e.preventDefault();

  const email    = $('email').value.trim();
  const password = $('password').value;
  let valid = true;

  if (!email || !EMAIL_RE.test(email)) {
    setError('emailWrap', 'emailError', true, 'Please enter a valid email address.');
    valid = false;
  }

  if (!password || password.length < 6) {
    setError('passwordWrap', 'passwordError', true, 'Password must be at least 6 characters.');
    valid = false;
  }

  if (!valid) return;

  // Show loading state
  const btn = $('loginBtn');
  btn.classList.add('loading');
  btn.disabled = true;

  // Simulate async login (replace with real API call)
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Show success overlay
  btn.classList.remove('loading');
  $('loginForm').style.display = 'none';
  $('signupRow').style.display = 'none';
  $('successOverlay').style.display = 'flex';
});

// ── Forgot password ───────────────────────────────────────────
$('forgotLink').addEventListener('click', e => {
  e.preventDefault();
  const email = $('email').value.trim();

  if (!email || !EMAIL_RE.test(email)) {
    setError('emailWrap', 'emailError', true, 'Enter your email above first.');
    $('email').focus();
  } else {
    alert('Password reset link sent to ' + email);
  }
});
