// API JavaScript for Delivery Operations

document.addEventListener('DOMContentLoaded', function() {
    // Handle profile form submission
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateDeliveryProfile();
        });
    }
    
    // Handle password form submission
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateDeliveryPassword();
        });
    }
    
    // Handle preferences form submission
    const preferencesForm = document.getElementById('preferencesForm');
    if (preferencesForm) {
        preferencesForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateDeliveryPreferences();
        });
    }
    
    // Handle cancel button for profile form
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
                // Reload the page to reset form
                window.location.reload();
            }
        });
    }
});

// Update delivery profile function
function updateDeliveryProfile() {
    // Get form data
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const vehicleType = document.getElementById('vehicleType').value;
    const licensePlate = document.getElementById('licensePlate').value.trim();
    const deliveryArea = document.getElementById('deliveryArea').value.trim();
    
    // Validate required fields
    if (!firstName || !lastName || !email || !phone) {
        showAlert('Please fill in all required fields', 'danger');
        return;
    }
    
    // Email validation
    if (!isValidEmail(email)) {
        showAlert('Please enter a valid email address', 'danger');
        return;
    }
    
    // Phone validation (simple validation)
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (!phoneRegex.test(phone)) {
        showAlert('Please enter a valid phone number (format: (123) 456-7890)', 'danger');
        return;
    }
    
    // License plate validation (alphanumeric with hyphens)
    const licenseRegex = /^[A-Z0-9]{2,4}-[A-Z0-9]{2,4}$/;
    if (licensePlate && !licenseRegex.test(licensePlate)) {
        showAlert('Please enter a valid license plate number (format: ABC-123)', 'danger');
        return;
    }
    
    // In a real application, you would send this data to your server
    console.log('Updating delivery profile with data:', {
        firstName, lastName, email, phone, vehicleType, licensePlate, deliveryArea
    });
    
    // Show loading state
    const submitButton = document.querySelector('#profileForm .btn-primary');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Saving...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showAlert('Profile updated successfully!', 'success');
    }, 1500);
}

// Update delivery password function
function updateDeliveryPassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
        showAlert('Please fill in all password fields', 'danger');
        return;
    }
    
    // Password validation
    if (newPassword.length < 6) {
        showAlert('New password must be at least 6 characters long', 'danger');
        return;
    }
    
    // Confirm password match
    if (newPassword !== confirmPassword) {
        showAlert('New passwords do not match', 'danger');
        return;
    }
    
    // In a real application, you would send this data to your server
    console.log('Updating delivery password');
    
    // Show loading state
    const submitButton = document.querySelector('#passwordForm .btn-primary');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Updating...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showAlert('Password updated successfully!', 'success');
        
        // Reset form
        document.getElementById('passwordForm').reset();
    }, 1500);
}

// Update delivery preferences function
function updateDeliveryPreferences() {
    const notifications = document.getElementById('notifications').checked;
    const availability = document.getElementById('availability').checked;
    const workingHours = document.getElementById('workingHours').value;
    const deliveryArea = document.getElementById('deliveryArea').value.trim();
    
    // In a real application, you would send this data to your server
    console.log('Updating delivery preferences with data:', {
        notifications, availability, workingHours, deliveryArea
    });
    
    // Show loading state
    const submitButton = document.querySelector('#preferencesForm .btn-primary');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Saving...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showAlert('Preferences updated successfully!', 'success');
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
    alertDiv.className = `alert alert-${type === 'info' ? 'warning' : type}`;
    alertDiv.textContent = message;
    
    // Insert at the top of the container
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
    }
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Email validation helper
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}