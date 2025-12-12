// frontend/bookshop/session.js

document.addEventListener('DOMContentLoaded', function() {
    // 1. Setup Mobile Menu
    setupMobileMenu();

    // 2. Update Navbar based on Auth Status
    updateNavigation();

    // 3. Setup Logout Listener
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleLogout();
        });
    }
});

// --- Navigation State Management ---
function updateNavigation() {
    const token = localStorage.getItem('jwt_token');

    const navLogin = document.getElementById('nav-login');
    const navRegister = document.getElementById('nav-register');
    const navLogout = document.getElementById('nav-logout');

    // Optional: Select elements that should only be visible when logged in
    const navProfile = document.querySelector('a[href="profile.html"]')?.parentElement;
    const navOrders = document.querySelector('a[href="orders.html"]')?.parentElement;

    if (token) {
        // User is Logged In
        if(navLogin) navLogin.style.display = 'none';
        if(navRegister) navRegister.style.display = 'none';

        if(navLogout) navLogout.style.display = 'block';
        if(navProfile) navProfile.style.display = 'block';
        if(navOrders) navOrders.style.display = 'block';
    } else {
        // User is Logged Out
        if(navLogin) navLogin.style.display = 'block';
        if(navRegister) navRegister.style.display = 'block';

        if(navLogout) navLogout.style.display = 'none';
    }
}

// --- Logout Logic ---
function handleLogout() {
    if(confirm("Are you sure you want to logout?")) {
        // 1. Clear Local Storage
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user_role');
        localStorage.removeItem('user_email');

        // 2. Redirect to Main Dashboard (index.html)
        // Check current path depth to determine correct redirect url
        const path = window.location.pathname;
        if(path.includes('/customer/')) {
            window.location.href = 'index.html';
        } else {
            // Fallback for other locations
            window.location.href = '../customer/index.html';
        }
    }
}

// --- Mobile Menu Setup ---
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