// ── Toggle password visibility ──
const passwordInput = document.getElementById('password');
const togglePass    = document.getElementById('togglePass');

togglePass.addEventListener('click', () => {
  const isHidden = passwordInput.type === 'password';
  passwordInput.type = isHidden ? 'text' : 'password';
  togglePass.textContent = isHidden ? '🙈' : '👁';
});

// ── Form validation & submission ──
const loginForm     = document.getElementById('loginForm');
const loginBtn      = document.getElementById('loginBtn');
const emailInput    = document.getElementById('email');
const emailError    = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const successOverlay = document.getElementById('successOverlay');

function validateEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
}

// Live validation
emailInput.addEventListener('input', () => {
  emailError.classList.toggle('visible', emailInput.value && !validateEmail(emailInput.value));
});

passwordInput.addEventListener('input', () => {
  passwordError.classList.toggle('visible', passwordInput.value.length > 0 && passwordInput.value.length < 6);
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let valid = true;

  if (!validateEmail(emailInput.value)) {
    emailError.classList.add('visible');
    valid = false;
  } else {
    emailError.classList.remove('visible');
  }

  if (passwordInput.value.length < 6) {
    passwordError.classList.add('visible');
    valid = false;
  } else {
    passwordError.classList.remove('visible');
  }

  if (!valid) return;

  // Simulate login loading
  loginBtn.classList.add('loading');
  loginBtn.disabled = true;

  setTimeout(() => {
    loginBtn.classList.remove('loading');
    loginForm.style.display = 'none';
    successOverlay.classList.add('visible');
  }, 1800);
});

// ── Input floating icon colour sync (additional touch) ──
[emailInput, passwordInput].forEach(inp => {
  inp.addEventListener('focus', () => {
    inp.closest('.input-wrap').querySelector('.icon').style.color = '#1a8fc1';
  });
  inp.addEventListener('blur', () => {
    inp.closest('.input-wrap').querySelector('.icon').style.color = '#7dbee0';
  });
});
