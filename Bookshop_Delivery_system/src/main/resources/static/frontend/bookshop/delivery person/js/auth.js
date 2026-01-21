// src/main/resources/static/frontend/bookshop/delivery person/js/auth.js

const API_BASE_URL = "http://localhost:8080/api/auth";
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleDeliveryLogin();
        });
    }
});

async function handleDeliveryLogin() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitButton = document.querySelector('#loginForm .btn');
    const originalText = submitButton.textContent;

    if (!emailInput.value || !passwordInput.value) {
        showAlert('Please fill in all fields', 'danger');
        return;
    }

    submitButton.textContent = 'Logging in...';
    submitButton.disabled = true;

    try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: emailInput.value, password: passwordInput.value })
        });

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Server Error: Non-JSON response received.");
        }

        const data = await response.json();

        if (response.ok) {
            if (data.role !== 'DELIVERY_PERSON' && data.role !== 'ADMIN') {
                throw new Error('Access Denied: Not authorized for delivery.');
            }
            localStorage.setItem('jwt_token', data.token);
            localStorage.setItem('user_role', data.role);
            window.location.href = 'index.html';
        } else {
            throw new Error(data.message || 'Invalid email or password');
        }
    } catch (error) {
        showAlert(error.message, 'danger');
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

function showAlert(message, type) {
    const existing = document.querySelector('.alert');
    if (existing) existing.remove();
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    document.querySelector('.form-container').insertBefore(alertDiv, document.querySelector('#loginForm'));
    setTimeout(() => alertDiv.remove(), 5000);
}