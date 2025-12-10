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

    // Password visibility toggle logic (Keep existing)
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

// Helper Functions
function saveAuthToken(token) {
    localStorage.setItem('jwt_token', token);
}

// Handle login functionality
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
            saveAuthToken(data.token);
            showAlert('Login successful!', 'success');

            // Redirect based on role logic could be added here if the backend returns role
            // For now, default to index.html
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

// Handle registration functionality
async function handleRegister() {
    const name = document.getElementById('name').value;
    // Split name into first and last
    const nameParts = name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Capture the selected role from the dropdown
    const roleSelect = document.getElementById('role');
    const role = roleSelect ? roleSelect.value : 'CUSTOMER';

    const submitButton = document.querySelector('#registerForm .btn');

    // Validation
    if (!name || !email || !password || !confirmPassword) {
        showAlert('Please fill in all fields', 'danger');
        return;
    }

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
                role: role // Send the selected role (CUSTOMER, BOOKSELLER, or DELIVERY_PERSON)
            })
        });

        if (response.ok) {
            const data = await response.json();
            saveAuthToken(data.token); // Auto-login on register
            showAlert('Account created successfully!', 'success');

            // Redirect based on role
            setTimeout(() => {
                if (role === 'BOOKSELLER') {
                    window.location.href = '../bookseller/index.html';
                } else if (role === 'DELIVERY_PERSON') {
                    window.location.href = '../delivery person/index.html';
                } else {
                    window.location.href = 'index.html';
                }
            }, 1000);
        } else {
            const err = await response.text();
            // Attempt to parse error as JSON if possible, otherwise use text
            try {
                const errObj = JSON.parse(err);
                showAlert('Registration failed: ' + (errObj.message || err), 'danger');
            } catch(e) {
                showAlert('Registration failed: ' + err, 'danger');
            }
        }
    } catch (error) {
        console.error('Register Error:', error);
        showAlert('Network error occurred', 'danger');
    } finally {
        submitButton.textContent = 'Create Account';
        submitButton.disabled = false;
    }
}

// Show alert messages (Keep existing)
function showAlert(message, type = 'success') {
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) existingAlert.remove();

    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;

    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
        formContainer.insertBefore(alertDiv, formContainer.firstChild);
    }

    setTimeout(() => {
        if (alertDiv.parentNode) alertDiv.remove();
    }, 5000);
}