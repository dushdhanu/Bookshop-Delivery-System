// Customer Authentication JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
    
    // Handle registration form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRegister();
        });
    }
    
    // Password visibility toggle
    const passwordToggles = document.querySelectorAll('.password-toggle-btn');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                this.textContent = 'Hide';
            } else {
                input.type = 'password';
                this.textContent = 'Show';
            }
        });
    });
});

// Handle login functionality
function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Basic validation
    if (!email || !password) {
        showAlert('Please fill in all fields', 'danger');
        return;
    }
    
    // Email validation
    if (!isValidEmail(email)) {
        showAlert('Please enter a valid email address', 'danger');
        return;
    }
    
    // In a real application, you would send this data to your server
    // For demo purposes, we'll simulate a successful login
    console.log('Login attempt with:', { email, password });
    
    // Show loading state
    const submitButton = document.querySelector('#loginForm .btn');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Logging in...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showAlert('Login successful! Redirecting...', 'success');
        
        // In a real app, you would redirect to another page
        // window.location.href = 'profile.html';
    }, 1500);
}

// Handle registration functionality
function handleRegister() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
        showAlert('Please fill in all fields', 'danger');
        return;
    }
    
    // Email validation
    if (!isValidEmail(email)) {
        showAlert('Please enter a valid email address', 'danger');
        return;
    }
    
    // Password validation
    if (password.length < 6) {
        showAlert('Password must be at least 6 characters long', 'danger');
        return;
    }
    
    // Confirm password match
    if (password !== confirmPassword) {
        showAlert('Passwords do not match', 'danger');
        return;
    }
    
    // Show loading state
    const submitButton = document.querySelector('#registerForm .btn');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Creating Account...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showAlert('Account created successfully! Redirecting to login...', 'success');
        
        // In a real app, you would redirect to login page
        // window.location.href = 'login.html';
    }, 1500);
}

// Email validation helper
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show alert messages
function showAlert(message, type = 'success') {
    // Remove existing alerts
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // Insert at the top of the form container
    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
        formContainer.insertBefore(alertDiv, formContainer.firstChild);
    }
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
    // Customer Authentication JavaScript

    document.addEventListener('DOMContentLoaded', function() {
        // Handle login form submission
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleLogin();
            });
        }

        // Handle registration form submission
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleRegister();
            });
        }

        // Keep Password visibility toggle logic...
    });

    async function handleLogin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const submitButton = document.querySelector('#loginForm .btn');

        if (!email || !password) {
            showAlert('Please fill in all fields', 'danger');
            return;
        }

        // UI Loading State
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Logging in...';
        submitButton.disabled = true;

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                saveAuthToken(data.token); // From session.js
                showAlert('Login successful!', 'success');
                setTimeout(() => window.location.href = 'index.html', 1000);
            } else {
                showAlert('Invalid email or password', 'danger');
            }
        } catch (error) {
            console.error('Login Error:', error);
            showAlert('Server connection failed', 'danger');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }

    async function handleRegister() {
        const name = document.getElementById('name').value;
        // Note: Backend expects firstName/lastName. We'll split the name for now.
        const nameParts = name.split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const submitButton = document.querySelector('#registerForm .btn');

        if (password !== confirmPassword) {
            showAlert('Passwords do not match', 'danger');
            return;
        }

        submitButton.textContent = 'Creating Account...';
        submitButton.disabled = true;

        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                    role: 'CUSTOMER'
                })
            });

            if (response.ok) {
                const data = await response.json();
                saveAuthToken(data.token); // Auto-login
                showAlert('Account created! Redirecting...', 'success');
                setTimeout(() => window.location.href = 'index.html', 1000);
            } else {
                const err = await response.text(); // or json() depending on error handling
                showAlert('Registration failed: ' + err, 'danger');
            }
        } catch (error) {
            showAlert('Network error occurred', 'danger');
        } finally {
            submitButton.textContent = 'Create Account';
            submitButton.disabled = false;
        }
    }
}