// Authentication JavaScript for Delivery Personnel

document.addEventListener('DOMContentLoaded', function() {
    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleDeliveryLogin();
        });
    }
});

// Handle delivery login functionality
function handleDeliveryLogin() {
    const employeeId = document.getElementById('employeeId').value;
    const password = document.getElementById('password').value;
    
    // Basic validation
    if (!employeeId || !password) {
        showAlert('Please fill in all fields', 'danger');
        return;
    }
    
    // Employee ID validation (format: EMP-YYYY-NNN)
    const empIdRegex = /^EMP-\d{4}-\d{3}$/;
    if (!empIdRegex.test(employeeId)) {
        showAlert('Please enter a valid Employee ID (format: EMP-YYYY-NNN)', 'danger');
        return;
    }
    
    // In a real application, you would send this data to your server
    // For demo purposes, we'll simulate a successful login
    console.log('Delivery login attempt with:', { employeeId, password });
    
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
        showAlert('Login successful! Redirecting to dashboard...', 'success');
        
        // In a real app, you would redirect to the delivery dashboard
        // window.location.href = 'index.html';
    }, 1500);
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
}