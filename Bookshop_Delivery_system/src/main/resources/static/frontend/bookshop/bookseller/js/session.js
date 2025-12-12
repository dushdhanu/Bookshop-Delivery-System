// frontend/bookshop/bookseller/js/session.js

document.addEventListener('DOMContentLoaded', function() {
    checkSession();
    setupLogout();
    setupMobileMenu();
});

function checkSession() {
    const token = localStorage.getItem('jwt_token');

    // Check if token exists
    if (!token) {
        alert("You must be logged in to view this page.");
        window.location.href = '../customer/login.html'; // Redirect to shared login
    }

    // Optional: Add Role validation here if needed
}

function setupLogout() {
    // Select the logout button by ID or class
    const logoutBtn = document.getElementById('logoutBtn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();

            if (confirm('Are you sure you want to logout from the Bookseller Portal?')) {
                // 1. Clear all auth data
                localStorage.removeItem('jwt_token');
                localStorage.removeItem('user_role');
                localStorage.removeItem('user_email');

                // 2. Redirect to main customer home page
                // Correct relative path: from /bookseller/ to /customer/index.html
                window.location.href = '../customer/index.html';
            }
        });
    }
}

function setupMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.toggle('change'));
        });
    }
}