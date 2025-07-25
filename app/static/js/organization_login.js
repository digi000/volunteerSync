// Toggle password visibility
const togglePassword = document.getElementById('togglePassword');
const password = document.getElementById('password');

togglePassword.addEventListener('click', function () {
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  this.classList.toggle('fa-eye-slash');
});

// Form validation
const loginForm = document.getElementById('adminLoginForm');
const passwordError = document.getElementById('passwordError');

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const passwordVal = document.getElementById('password').value;

  if (email === '' || passwordVal === '') {
    passwordError.style.display = 'block';
    passwordError.textContent = 'Please fill in all fields';
    return;
  }

  // Replace with backend authentication call
  console.log('Logging in with:', { email, password: passwordVal });

  passwordError.style.display = 'block';
  passwordError.textContent = 'Invalid email or password';

  // On success: window.location.href = '/admin-dashboard';
});

// Clear error on input
document.querySelectorAll('.input-field').forEach(input => {
  input.addEventListener('input', () => {
    passwordError.style.display = 'none';
  });
});

