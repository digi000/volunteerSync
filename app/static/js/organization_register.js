// Toggle password visibility
document.getElementById('togglePassword').addEventListener('click', function() {
  const password = document.getElementById('password');
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  this.classList.toggle('fa-eye-slash');
});

document.getElementById('toggleConfirmPassword').addEventListener('click', function() {
  const confirmPassword = document.getElementById('confirm-password');
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

// Form validation
document.getElementById('orgRegisterForm').addEventListener('submit', function(e) {
  e.preventDefault();
  let isValid = true;

  document.querySelectorAll('.error-message').forEach(el => {
    el.style.display = 'none';
  });

  const name = document.getElementById('org-name').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value;
  const phone = document.getElementById('telephone').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (!name) {
    document.getElementById('nameError').style.display = 'block';
    isValid = false;
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById('emailError').style.display = 'block';
    isValid = false;
  }

  if (!address) {
    document.getElementById('addressError').style.display = 'block';
    isValid = false;
  }

  if (phone && !/^\d{10}$/.test(phone)) {
    document.getElementById('phoneError').style.display = 'block';
    isValid = false;
  }

  if (password.length < 8) {
    document.getElementById('passwordError').style.display = 'block';
    isValid = false;
  }

  if (password !== confirmPassword) {
    document.getElementById('confirmError').style.display = 'block';
    isValid = false;
  }

  if (isValid) {
    const orgData = {
      name,
      email,
      address,
      telephone: phone || null,
      password
    };

    console.log('Submitting:', orgData);
    alert('Organization registration successful! (This would redirect in production)');
  }
});
