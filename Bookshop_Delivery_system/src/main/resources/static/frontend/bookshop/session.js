// Session and Navigation JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.classList.toggle('change');
            });
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            
            // Remove active class from hamburger icon
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.classList.remove('change');
            });
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
        
        if (!isClickInsideNav && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            
            // Remove active class from hamburger icon
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.classList.remove('change');
            });
        }
    });
    
    // Set active navigation link based on current page
    setActiveNavLink();
    
    // Profile page functionality
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateProfile();
        });
    }
    
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updatePassword();
        });
    }
    
    const preferencesForm = document.getElementById('preferencesForm');
    if (preferencesForm) {
        preferencesForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updatePreferences();
        });
    }
    
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
                window.location.reload();
            }
        });
    }
    
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', function() {
            deleteAccount();
        });
    }
});

// Set active navigation link
function setActiveNavLink() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop();
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Remove active class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current page link
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// User session management
function checkUserSession() {
    // In a real application, this would check if the user is logged in
    // For demo purposes, we'll just return a mock status
    return {
        isLoggedIn: false,
        user: null
    };
}

// Update navigation based on user session
function updateNavigation() {
    const session = checkUserSession();
    const loginLink = document.querySelector('a[href="login.html"]');
    const registerLink = document.querySelector('a[href="register.html"]');
    const profileLink = document.querySelector('a[href="profile.html"]');
    const ordersLink = document.querySelector('a[href="orders.html"]');
    
    if (session.isLoggedIn) {
        // User is logged in
        if (loginLink) loginLink.textContent = 'Logout';
        if (registerLink) registerLink.style.display = 'none';
        if (profileLink) profileLink.style.display = 'block';
        if (ordersLink) ordersLink.style.display = 'block';
    } else {
        // User is not logged in
        if (loginLink) loginLink.textContent = 'Login';
        if (registerLink) registerLink.style.display = 'block';
        if (profileLink) profileLink.style.display = 'none';
        if (ordersLink) ordersLink.style.display = 'none';
    }
}

// Logout function
function logout() {
    // In a real application, this would clear the user session
    console.log('User logged out');
    updateNavigation();
    window.location.href = 'index.html';
}

// Update profile function
function updateProfile() {
    // In a real application, this would send the profile data to the server
    console.log('Updating profile');
    
    // Show loading state
    const saveBtn = document.querySelector('#profileForm .btn-primary');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = 'Saving...';
    saveBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Reset button
        saveBtn.textContent = originalText;
        saveBtn.disabled = false;
        
        // Show success message
        showAlert('Profile updated successfully!', 'success');
    }, 1500);
}

// Update password function
function updatePassword() {
    // Get form data
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate passwords
    if (!currentPassword || !newPassword || !confirmPassword) {
        showAlert('Please fill in all password fields', 'danger');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showAlert('New passwords do not match', 'danger');
        return;
    }
    
    if (newPassword.length < 6) {
        showAlert('Password must be at least 6 characters long', 'danger');
        return;
    }
    
    // In a real application, this would send the password data to the server
    console.log('Updating password');
    
    // Show loading state
    const updateBtn = document.querySelector('#passwordForm .btn-primary');
    const originalText = updateBtn.textContent;
    updateBtn.textContent = 'Updating...';
    updateBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Reset button
        updateBtn.textContent = originalText;
        updateBtn.disabled = false;
        
        // Clear form
        document.getElementById('passwordForm').reset();
        
        // Show success message
        showAlert('Password updated successfully!', 'success');
    }, 1500);
}

// Update preferences function
function updatePreferences() {
    // In a real application, this would send the preferences data to the server
    console.log('Updating preferences');
    
    // Show loading state
    const saveBtn = document.querySelector('#preferencesForm .btn-primary');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = 'Saving...';
    saveBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Reset button
        saveBtn.textContent = originalText;
        saveBtn.disabled = false;
        
        // Show success message
        showAlert('Preferences updated successfully!', 'success');
    }, 1500);
}

// Delete account function
function deleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        // In a real application, this would send a request to delete the account
        console.log('Deleting account');
        
        // Show loading state
        const deleteBtn = document.getElementById('deleteAccountBtn');
        const originalText = deleteBtn.textContent;
        deleteBtn.textContent = 'Deleting...';
        deleteBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Show success message
            showAlert('Account deleted successfully. You have been logged out.', 'success');
            
            // In a real application, you would log the user out
            // logout();
        }, 1500);
    }
    // Session and Navigation JavaScript

    const API_BASE_URL = 'http://localhost:8080/api';

    document.addEventListener('DOMContentLoaded', function() {
        // Mobile navigation toggle (Keep existing UI logic)
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                const bars = document.querySelectorAll('.bar');
                bars.forEach(bar => bar.classList.toggle('change'));
            });
        }

        // Close mobile menu logic... (Keep existing)

        // Check session on load
        updateNavigation();

        // Handle global logout button if present
        const logoutBtn = document.getElementById('logoutBtn'); // Ensure your logout link has this ID
        if(logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                logout();
            });
        }
    });

// --- JWT Helper Functions ---

    function saveAuthToken(token) {
        localStorage.setItem('jwt_token', token);
    }

    function getAuthToken() {
        return localStorage.getItem('jwt_token');
    }

    function clearAuthToken() {
        localStorage.removeItem('jwt_token');
    }

    function isLoggedIn() {
        const token = getAuthToken();
        // In a real app, you might want to decode the JWT to check expiration
        return !!token;
    }

    function getAuthHeaders() {
        const token = getAuthToken();
        return {
            'Authorization': `Bearer ${token}`,
            // Note: Don't set Content-Type here if sending FormData (file uploads)
            // Let the browser set it automatically for multipart/form-data
        };
    }

    function getJsonHeaders() {
        return {
            ...getAuthHeaders(),
            'Content-Type': 'application/json'
        };
    }

// --- Navigation & User Interface ---

    function updateNavigation() {
        const loggedIn = isLoggedIn();

        // Select links based on their href or text content
        const loginLinks = document.querySelectorAll('a[href="login.html"]');
        const registerLinks = document.querySelectorAll('a[href="register.html"]');
        const profileLinks = document.querySelectorAll('a[href="profile.html"]');
        const ordersLinks = document.querySelectorAll('a[href="orders.html"]');

        if (loggedIn) {
            loginLinks.forEach(link => {
                link.textContent = 'Logout';
                link.href = '#';
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    logout();
                });
            });
            registerLinks.forEach(el => el.style.display = 'none');
            profileLinks.forEach(el => el.style.display = 'block');
            ordersLinks.forEach(el => el.style.display = 'block');
        } else {
            loginLinks.forEach(link => {
                link.textContent = 'Login';
                link.href = 'login.html';
            });
            registerLinks.forEach(el => el.style.display = 'block');
            profileLinks.forEach(el => el.style.display = 'none');
            ordersLinks.forEach(el => el.style.display = 'none');
        }
    }

    function logout() {
        clearAuthToken();
        updateNavigation();
        window.location.href = 'index.html'; // Redirect to home
    }

// Function to show alerts (Keep existing)
    function showAlert(message, type = 'success') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;

        const container = document.querySelector('.container');
        if (container) {
            container.insertBefore(alertDiv, container.firstChild);
        }

        setTimeout(() => {
            if(alertDiv.parentNode) alertDiv.parentNode.removeChild(alertDiv);
        }, 5000);
    }
}