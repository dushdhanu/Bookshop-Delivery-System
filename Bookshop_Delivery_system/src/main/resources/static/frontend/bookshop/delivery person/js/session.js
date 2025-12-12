// frontend/bookshop/delivery person/js/session.js

document.addEventListener('DOMContentLoaded', function() {
    checkSession();
    setupLogout();
    setupMobileMenu();
});

function checkSession() {
    const token = localStorage.getItem('jwt_token');
    // Exclude login page from check to prevent infinite loop
    const isLoginPage = window.location.pathname.includes('login.html');

    if (!token && !isLoginPage) {
        // Redirect to delivery login
        window.location.href = 'login.html';
    }
}

function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to end your shift and logout?')) {
                // 1. Clear all auth data
                localStorage.removeItem('jwt_token');
                localStorage.removeItem('user_role');
                localStorage.removeItem('user_email');

                // 2. Redirect to Customer Home Page
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