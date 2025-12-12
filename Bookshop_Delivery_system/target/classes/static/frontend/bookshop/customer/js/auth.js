// src/main/resources/static/frontend/bookshop/customer/js/auth.js

const API_BASE_URL = "http://localhost:8080/api/auth";

document.addEventListener('DOMContentLoaded', function() {
    // 1. Handle Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop page reload
            handleLogin();
        });
    }

    // 2. Handle Register Form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop page reload
            handleRegister();
        });
    }

    // 3. Password Visibility Toggle
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

// --- LOGIN FUNCTION ---
async function handleLogin() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitButton = document.querySelector('#loginForm button[type="submit"]');
    const originalText = submitButton.textContent;

    if (!emailInput.value || !passwordInput.value) {
        showAlert('Please fill in all fields', 'danger');
        return;
    }

    // UI Loading State
    submitButton.textContent = 'Logging in...';
    submitButton.disabled = true;

    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: emailInput.value,
                password: passwordInput.value
            })
        });

        // Handle non-JSON responses (server errors)
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Server returned a non-JSON response. Check backend logs.");
        }

        const data = await response.json();

        if (response.ok) {
            // SUCCESS
            localStorage.setItem('jwt_token', data.token);
            localStorage.setItem('user_role', data.role);
            localStorage.setItem('user_email', emailInput.value); // Store email for profile fetching

            showAlert('Login successful! Redirecting...', 'success');

            // Redirect based on Role
            setTimeout(() => {
                if (data.role === 'ADMIN') {
                    window.location.href = '../admin/index.html';
                } else if (data.role === 'BOOKSELLER') {
                    window.location.href = '../bookseller/index.html';
                } else if (data.role === 'DELIVERY_PERSON') {
                    window.location.href = '../delivery person/index.html';
                } else {
                    window.location.href = 'index.html'; // Customer Home
                }
            }, 1000);
        } else {
            // FAILURE (Bad credentials)
            throw new Error(data.message || 'Invalid email or password');
        }
    } catch (error) {
        console.error('Login Error:', error);
        showAlert(error.message, 'danger');
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

// --- REGISTER FUNCTION ---
async function handleRegister() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const roleSelect = document.getElementById('role');
    const submitButton = document.querySelector('#registerForm button[type="submit"]');
    const originalText = submitButton.textContent;

    // Validation
    if (!nameInput.value || !emailInput.value || !passwordInput.value) {
        showAlert('Please fill in all fields', 'danger');
        return;
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
        showAlert('Passwords do not match', 'danger');
        return;
    }

    // Split Name
    const nameParts = nameInput.value.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';
    const role = roleSelect ? roleSelect.value : 'CUSTOMER';

    // UI Loading State
    submitButton.textContent = 'Creating Account...';
    submitButton.disabled = true;

    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: emailInput.value,
                password: passwordInput.value,
                role: role
            })
        });

        if (response.ok) {
            const data = await response.json();

            // Auto-Login after Register
            localStorage.setItem('jwt_token', data.token);
            localStorage.setItem('user_role', data.role);
            localStorage.setItem('user_email', emailInput.value);

            showAlert('Account created successfully!', 'success');

            // Redirect
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
            // Handle plain text errors from backend
            const errorText = await response.text();
            throw new Error(errorText || 'Registration failed');
        }
    } catch (error) {
        console.error('Register Error:', error);
        showAlert(error.message, 'danger');
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

// Helper: Show Alert
function showAlert(message, type = 'success') {
    // Remove existing alerts
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) existingAlert.remove();

    // Create new alert
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;

    // Add simple styling if css missing
    alertDiv.style.padding = '10px';
    alertDiv.style.marginBottom = '15px';
    alertDiv.style.borderRadius = '5px';
    alertDiv.style.textAlign = 'center';

    if(type === 'danger') {
        alertDiv.style.backgroundColor = '#f8d7da';
        alertDiv.style.color = '#721c24';
    } else {
        alertDiv.style.backgroundColor = '#d4edda';
        alertDiv.style.color = '#155724';
    }

    const container = document.querySelector('.form-container') || document.querySelector('.container');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
    }

    setTimeout(() => {
        if (alertDiv.parentNode) alertDiv.remove();
    }, 5000);
}