// ── Helpers ──────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Error helper ─────────────────────────────────────────────
function setError(wrapId, errId, show, msg) {
  const wrap = $(wrapId);
  const err = $(errId);
  if (show) {
    if (wrap) wrap.classList.add('error');
    err.classList.add('visible');
    if (msg) err.querySelector('span').textContent = msg;
  } else {
    if (wrap) wrap.classList.remove('error');
    err.classList.remove('visible');
  }
}

// ── Password strength ─────────────────────────────────────────
function calcStrength(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score; // 0-5
}

function updateStrength(pw) {
  const bar = $('strengthBar');
  const label = $('strengthLabel');
  if (!pw) {
    bar.style.width = '0%';
    bar.style.background = '';
    label.textContent = '';
    label.style.color = '';
    return;
  }
  const score = calcStrength(pw);
  const levels = [
    { pct: '20%', color: '#E05A5A', text: 'Very weak' },
    { pct: '40%', color: '#E09A2A', text: 'Weak' },
    { pct: '60%', color: '#E0C42A', text: 'Fair' },
    { pct: '80%', color: '#2CC47A', text: 'Strong' },
    { pct: '100%', color: '#00C4CC', text: 'Very strong' },
  ];
  const lvl = levels[Math.max(0, score - 1)] || levels[0];
  bar.style.width = lvl.pct;
  bar.style.background = lvl.color;
  label.textContent = lvl.text;
  label.style.color = lvl.color;
}

// ── Eye toggles ───────────────────────────────────────────────
function initEyeToggle(toggleId, inputId, openId, closedId) {
  $(toggleId).addEventListener('click', () => {
    const pw = $(inputId);
    const show = pw.type === 'password';
    pw.type = show ? 'text' : 'password';
    $(openId).style.display = show ? 'none' : '';
    $(closedId).style.display = show ? '' : 'none';
    $(toggleId).setAttribute('aria-label', show ? 'Hide password' : 'Show password');
  });
}

initEyeToggle('eyeToggle', 'password', 'eyeOpen', 'eyeClosed');
initEyeToggle('eyeToggle2', 'confirmPassword', 'eyeOpen2', 'eyeClosed2');

// ── Live validation ───────────────────────────────────────────
$('firstName').addEventListener('input', () => {
  setError('firstNameWrap', 'firstNameError',
    $('firstName').value && $('firstName').value.trim() === '',
    'First name is required.');
});

$('lastName').addEventListener('input', () => {
  setError('lastNameWrap', 'lastNameError',
    $('lastName').value && $('lastName').value.trim() === '',
    'Last name is required.');
});

$('email').addEventListener('input', () => {
  setError('emailWrap', 'emailError',
    $('email').value && !EMAIL_RE.test($('email').value),
    'Please enter a valid email address.');
});

$('password').addEventListener('input', () => {
  const pw = $('password').value;
  updateStrength(pw);
  setError('passwordWrap', 'passwordError',
    pw && pw.length < 8,
    'Password must be at least 8 characters.');
  // Re-check confirm field live
  if ($('confirmPassword').value) {
    setError('confirmPasswordWrap', 'confirmPasswordError',
      $('confirmPassword').value !== pw,
      'Passwords do not match.');
  }
});

$('confirmPassword').addEventListener('input', () => {
  setError('confirmPasswordWrap', 'confirmPasswordError',
    $('confirmPassword').value && $('confirmPassword').value !== $('password').value,
    'Passwords do not match.');
});

// ── Form submission ───────────────────────────────────────────
$('signupForm').addEventListener('submit', async e => {
  e.preventDefault();

  const firstName = $('firstName').value.trim();
  const lastName = $('lastName').value.trim();
  const email = $('email').value.trim();
  const password = $('password').value;
  const confirm = $('confirmPassword').value;
  const agreed = $('agreeTerms').checked;
  let valid = true;

  if (!firstName) {
    setError('firstNameWrap', 'firstNameError', true, 'First name is required.');
    valid = false;
  }
  if (!lastName) {
    setError('lastNameWrap', 'lastNameError', true, 'Last name is required.');
    valid = false;
  }
  if (!email || !EMAIL_RE.test(email)) {
    setError('emailWrap', 'emailError', true, 'Please enter a valid email address.');
    valid = false;
  }
  if (!password || password.length < 8) {
    setError('passwordWrap', 'passwordError', true, 'Password must be at least 8 characters.');
    valid = false;
  }
  if (confirm !== password) {
    setError('confirmPasswordWrap', 'confirmPasswordError', true, 'Passwords do not match.');
    valid = false;
  }
  if (!agreed) {
    setError(null, 'termsError', true, 'You must accept the terms to continue.');
    valid = false;
  } else {
    setError(null, 'termsError', false);
  }

  if (!valid) return;

  // Show loading state
  const btn = $('signupBtn');
  btn.classList.add('loading');
  btn.disabled = true;

  // Simulate async signup (replace with real API call)
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Show success overlay
  btn.classList.remove('loading');
  $('signupForm').style.display = 'none';
  $('loginRow').style.display = 'none';
  $('successOverlay').style.display = 'flex';

  // Redirect to login after 2s
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 2000);
});
