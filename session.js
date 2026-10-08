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
    
    // Update navigation based on login status
    updateNavigation();
    
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
            Swal.fire({
                title: 'Confirmation',
                text: 'Are you sure you want to cancel? Any unsaved changes will be lost.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3b82f6',
                cancelButtonColor: '#ef4444',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            })
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
async function checkUserSession() {
    try {
        const res = await fetch('/api/profile');
        const data = await res.json();
        if (data.success && data.data) {
            return { isLoggedIn: true, user: data.data };
        }
    } catch (e) {
        console.error('Session check failed', e);
    }
    return { isLoggedIn: false, user: null };
}

// Update navigation based on user session
async function updateNavigation() {
    console.log("Navbar update script is running...");
    const session = await checkUserSession();
    console.log("Session Check Result:", session);
    
    // Find links by text content so it works consistently across pages
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const loginLink = navLinks.find(link => link.textContent.trim() === 'Login' || link.textContent.includes('Logout'));
    const registerLink = navLinks.find(link => link.textContent.trim() === 'Register' || link.textContent.includes('Welcome'));
    
    console.log("Found loginLink:", !!loginLink, "registerLink:", !!registerLink);
    
    if (session.isLoggedIn) {
        // User is logged in
        if (registerLink) {
            // Hide register link completely when logged in
            registerLink.parentElement.style.display = 'none';
        }
        if (loginLink) {
            loginLink.textContent = 'Logout';
            loginLink.href = '#';
            loginLink.style.backgroundColor = '#ef4444';
            loginLink.style.color = '#ffffff';
            loginLink.style.borderRadius = '5px';
            loginLink.style.padding = '0.5rem 1.5rem';
            loginLink.style.fontWeight = 'bold';
            loginLink.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
        }

        // Inject Welcome banner below navbar
        let welcomeBanner = document.getElementById('welcome-banner');
        if (!welcomeBanner) {
            welcomeBanner = document.createElement('div');
            welcomeBanner.id = 'welcome-banner';
            welcomeBanner.style.backgroundColor = '#10235d';
            welcomeBanner.style.color = '#a0c0ff';
            welcomeBanner.style.padding = '0.75rem 2rem';
            welcomeBanner.style.textAlign = 'right';
            welcomeBanner.style.fontWeight = '500';
            welcomeBanner.style.borderBottom = '1px solid #1e3a8a';
            welcomeBanner.style.fontSize = '1.05rem';
            
            const nav = document.querySelector('nav.navbar');
            if (nav) {
                nav.parentNode.insertBefore(welcomeBanner, nav.nextSibling);
            }
        }
        if (welcomeBanner) {
            welcomeBanner.textContent = `Welcome, ${session.user.first_name || 'User'}!`;
            welcomeBanner.style.display = 'block';
        }
    } else {
        // User is not logged in
        if (registerLink) {
            registerLink.parentElement.style.display = 'block';
            registerLink.textContent = 'Register';
            registerLink.href = window.location.pathname.includes('/customer/') ? 'register.html' : 'customer/register.html';
        }
        if (loginLink) {
            loginLink.textContent = 'Login';
            loginLink.style.backgroundColor = '';
            loginLink.style.color = '';
            loginLink.style.borderRadius = '';
            loginLink.style.padding = '';
            loginLink.style.fontWeight = '';
            // Determine relative path correctly for login
            loginLink.href = window.location.pathname.includes('/customer/') ? 'login.html' : 'customer/login.html';
        }
        
        let welcomeBanner = document.getElementById('welcome-banner');
        if (welcomeBanner) {
            welcomeBanner.style.display = 'none';
        }
    }
}

// Logout function
async function logout() {
    try {
        await fetch('/api/logout', { method: 'POST' });
        console.log('User logged out');
        updateNavigation();
        window.location.href = window.location.pathname.includes('/customer/') ? '../index.html' : 'index.html';
    } catch (e) {
        console.error('Logout failed', e);
    }
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
    Swal.fire({
                title: 'Confirmation',
                text: 'Are you sure you want to delete your account? This action cannot be undone.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3b82f6',
                cancelButtonColor: '#ef4444',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.isConfirmed) {
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
                }
            }), 1500);
    }
}