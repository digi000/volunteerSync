// Toggle password visibility
const togglePassword = document.getElementById('togglePassword');
const password = document.getElementById('password');

togglePassword.addEventListener('click', function() {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});

// Form submission
const loginForm = document.getElementById('volunteerLoginForm');
const loginError = document.getElementById('loginError');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember').checked;

    if (!email || !password) {
        loginError.textContent = 'Please fill in all fields';
        loginError.style.display = 'block';
        return;
    }

    const loginData = {
        email: email,
        password: password,
        remember_me: rememberMe
    };

    console.log('Login attempt:', loginData);

    // Uncomment when backend is ready
    // fetch('/volunteer-login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(loginData)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     if (data.success) {
    //         window.location.href = '/volunteer-dashboard';
    //     } else {
    //         loginError.textContent = data.message || 'Login failed';
    //         loginError.style.display = 'block';
    //     }
    // });

    // For demo
    loginError.style.display = 'block';
});

// Clear error on input
const inputs = document.querySelectorAll('.input-field');
inputs.forEach(input => {
    input.addEventListener('input', () => {
        loginError.style.display = 'none';
    });
});
