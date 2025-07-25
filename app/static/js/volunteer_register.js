// Initialize skills selectize
$('#skills').selectize({
    plugins: ['remove_button'],
    delimiter: ',',
    persist: false,
    create: true,
    maxItems: 10
});

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

// Form validation and submission
document.getElementById('volunteerRegisterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    
    // Reset errors
    document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
    });
    
    // Validate required fields
    const requiredFields = [
        'email', 'telephone', 'emergency-contact', 
        'address', 'password', 'confirm-password'
    ];
    
    requiredFields.forEach(field => {
        const element = document.getElementById(field);
        if (!element.value) {
            document.getElementById(`${field}Error`).style.display = 'block';
            document.getElementById(`${field}Error`).textContent = 'This field is required';
            isValid = false;
        }
    });
    
    // Validate email format
    const email = document.getElementById('email').value;
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }
    
    // Validate phone numbers (10 digits)
    const phoneFields = ['telephone', 'emergency-contact'];
    phoneFields.forEach(field => {
        const value = document.getElementById(field).value;
        if (value && !/^\d{10}$/.test(value)) {
            document.getElementById(`${field}Error`).style.display = 'block';
            isValid = false;
        }
    });
    
    // Validate password length
    const password = document.getElementById('password').value;
    if (password && password.length < 8) {
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
    }
    
    // Validate password match
    const confirmPassword = document.getElementById('confirm-password').value;
    if (password !== confirmPassword) {
        document.getElementById('confirmError').style.display = 'block';
        isValid = false;
    }
    
    // Validate at least one skill selected
    const skillsSelect = $('#skills')[0].selectize;
    if (skillsSelect.items.length === 0) {
        document.getElementById('skillsError').style.display = 'block';
        isValid = false;
    }
    
    if (isValid) {
        // Prepare data matching your Volunteers model
        const volunteerData = {
            first_name: document.getElementById('first-name').value || null,
            last_name: document.getElementById('last-name').value || null,
            email: email,
            telephone: document.getElementById('telephone').value,
            emergency_contact: document.getElementById('emergency-contact').value,
            address: document.getElementById('address').value,
            skills: skillsSelect.items,
            password: password  // Note: In production, hash this before sending
        };
        
        console.log('Submitting:', volunteerData);
        
        // Here you would typically send to your Flask backend:
        // fetch('/register-volunteer', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(volunteerData)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     if (data.success) {
        //         window.location.href = '/volunteer-dashboard';
        //     } else {
        //         // Show server-side validation errors
        //         if (data.error.includes('email')) {
        //             document.getElementById('emailError').textContent = data.error;
        //             document.getElementById('emailError').style.display = 'block';
        //         }
        //     }
        // });
        
        // For demo purposes, just show success
        alert('Volunteer registration successful! (This would redirect in production)');
    }
});