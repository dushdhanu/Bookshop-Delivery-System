// Authentication JavaScript for Delivery Personnel

document.addEventListener('DOMContentLoaded', function() {
    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default HTML form submission
            handleDeliveryLogin();
        });
    }
});

// Show alert messages
function showAlert(message, type = 'success') {
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;

    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
        formContainer.insertBefore(alertDiv, formContainer.firstChild);
    }

    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Handle delivery login functionality
async function handleDeliveryLogin() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitButton = document.querySelector('#loginForm .btn');

    if (!emailInput || !passwordInput) return;

    const email = emailInput.value;
    const password = passwordInput.value;
    const originalText = submitButton.textContent;

    // Basic validation
    if (!email || !password) {
        showAlert('Please fill in all fields', 'danger');
        return;
    }

    // Show loading state
    submitButton.textContent = 'Logging in...';
    submitButton.disabled = true;

    try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        });

        if (response.ok) {
            const data = await response.json();

            // Security Check for Role
            if (data.role !== 'DELIVERY_PERSON' && data.role !== 'ADMIN') {
                showAlert('Access Denied: This account is not authorized for delivery.', 'danger');
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                return;
            }

            // Save Token
            localStorage.setItem('jwt_token', data.token);
            localStorage.setItem('user_role', data.role);

            showAlert('Login successful! Redirecting to dashboard...', 'success');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            showAlert('Invalid email or password', 'danger');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    } catch (error) {
        console.error('Login error:', error);
        showAlert('Server connection failed. Please try again.', 'danger');
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}