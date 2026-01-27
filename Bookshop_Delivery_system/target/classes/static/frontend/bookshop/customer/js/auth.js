const API_BASE_URL = "http://localhost:8080/api/auth";

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRegister();
        });
    }

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

async function handleLogin() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitButton = document.querySelector('#loginForm button[type="submit"]');
    const originalText = submitButton.textContent;

    if (!emailInput.value || !passwordInput.value) {
        showAlert('Please fill in all fields', 'danger');
        return;
    }

    submitButton.textContent = 'Logging in...';
    submitButton.disabled = true;

    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: emailInput.value,
                password: passwordInput.value
            })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('jwt_token', data.token);
            localStorage.setItem('user_role', data.role);
            localStorage.setItem('user_email', emailInput.value);

            showAlert('Login successful! Redirecting...', 'success');

            setTimeout(() => {
                if (data.role === 'ADMIN') window.location.href = '../admin/index.html';
                else if (data.role === 'BOOKSELLER') window.location.href = '../bookseller/index.html';
                else if (data.role === 'DELIVERY_PERSON') window.location.href = '../delivery person/index.html';
                else window.location.href = 'index.html';
            }, 1000);
        } else {
            // Updated to prioritize the message from GlobalExceptionHandler
            throw new Error(data.message || 'Check your inputs and try again');
        }
    } catch (error) {
        showAlert(error.message, 'danger');
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

async function handleRegister() {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const roleSelect = document.getElementById('role');
    const submitButton = document.querySelector('#registerForm button[type="submit"]');
    const originalText = submitButton.textContent;

    if (!firstNameInput.value || !lastNameInput.value || !emailInput.value || !passwordInput.value) {
        showAlert('Please fill in all fields', 'danger');
        return;
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
        showAlert('Passwords do not match', 'danger');
        return;
    }

    const role = roleSelect ? roleSelect.value : 'CUSTOMER';
    submitButton.textContent = 'Creating Account...';
    submitButton.disabled = true;

    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                email: emailInput.value,
                password: passwordInput.value,
                role: role
            })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('jwt_token', data.token);
            localStorage.setItem('user_role', data.role);
            localStorage.setItem('user_email', emailInput.value);

            showAlert('Account created successfully! Redirecting...', 'success');

            setTimeout(() => {
                if (data.role === 'ADMIN') window.location.href = '../admin/index.html';
                else if (data.role === 'BOOKSELLER') window.location.href = '../bookseller/index.html';
                else if (data.role === 'DELIVERY_PERSON') window.location.href = '../delivery person/index.html';
                else window.location.href = 'index.html';
            }, 1000);
        } else {
            throw new Error(data.message || 'Registration failed. Check your details.');
        }
    } catch (error) {
        showAlert(error.message, 'danger');
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

function showAlert(message, type = 'success') {
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) existingAlert.remove();

    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    alertDiv.style = "padding: 15px; margin-bottom: 20px; border-radius: 8px; text-align: center; font-weight: bold; width: 100%; box-sizing: border-box;";

    if(type === 'danger') {
        alertDiv.style.backgroundColor = '#f8d7da';
        alertDiv.style.color = '#721c24';
        alertDiv.style.border = '1px solid #f5c6cb';
    } else {
        alertDiv.style.backgroundColor = '#d4edda';
        alertDiv.style.color = '#155724';
        alertDiv.style.border = '1px solid #c3e6cb';
    }

    const container = document.querySelector('.form-container') || document.querySelector('.container');
    if (container) container.prepend(alertDiv);
    setTimeout(() => { if (alertDiv.parentNode) alertDiv.remove(); }, 5000);
}