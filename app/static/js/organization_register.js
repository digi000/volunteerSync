// Toggle password visibility
document.getElementById('togglePassword').addEventListener('click', function() {
  const password = document.getElementById('password');
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  this.classList.toggle('fa-eye-slash');
});

document.getElementById('toggleConfirmPassword').addEventListener('click', function() {
  const confirmPassword = document.getElementById('confirm_password');  // Updated ID
  const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
  confirmPassword.setAttribute('type', type);
  this.classList.toggle('fa-eye-slash');
});

// Password strength indicator
document.getElementById('password').addEventListener('input', function() {
  const strengthBar = document.getElementById('passwordStrength');
  const password = this.value;
  let strength = 0;

  if (password.length >= 8) strength += 1;
  if (password.match(/[a-z]/)) strength += 1;
  if (password.match(/[A-Z]/)) strength += 1;
  if (password.match(/[0-9]/)) strength += 1;
  if (password.match(/[^a-zA-Z0-9]/)) strength += 1;

  const width = (strength / 5) * 100;
  strengthBar.style.width = `${width}%`;

  if (strength <= 2) {
    strengthBar.style.background = 'var(--error)';
  } else if (strength <= 4) {
    strengthBar.style.background = '#FFC107';
  } else {
    strengthBar.style.background = 'var(--primary)';
  }
});

document.getElementById('orgRegisterForm').addEventListener('submit', function(e) {
});
