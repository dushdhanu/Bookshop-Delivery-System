// Validation Utilities

// Validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate password strength
function validatePassword(password) {
    // At least 6 characters
    if (password.length < 6) {
        return {
            isValid: false,
            message: 'Password must be at least 6 characters long'
        };
    }
    
    // Has at least one letter and one number
    if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
        return {
            isValid: false,
            message: 'Password must contain both letters and numbers'
        };
    }
    
    return {
        isValid: true,
        message: 'Password is valid'
    };
}

// Validate required fields
function validateRequiredFields(fields) {
    for (const field of fields) {
        if (!field.value.trim()) {
            return {
                isValid: false,
                message: `${field.name || field.id} is required`
            };
        }
    }
    
    return {
        isValid: true,
        message: 'All required fields are filled'
    };
}

// Check if passwords match
function validatePasswordMatch(password, confirmPassword) {
    if (password !== confirmPassword) {
        return {
            isValid: false,
            message: 'Passwords do not match'
        };
    }
    
    return {
        isValid: true,
        message: 'Passwords match'
    };
}

// Validate phone number format
function validatePhone(phone) {
    const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return re.test(phone);
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        validatePassword,
        validateRequiredFields,
        validatePasswordMatch,
        validatePhone
    };
}