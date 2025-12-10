// frontend/bookshop/bookseller/js/session.js

document.addEventListener('DOMContentLoaded', function() {
    checkSession();
    setupLogout();
    setupMobileMenu();
});

function checkSession() {
    const token = localStorage.getItem('jwt_token');
    // If no token exists, redirect to login page (assuming main login is shared or specific)
    // Adjust '../customer/login.html' if you have a specific bookseller login page
    if (!token) {
        alert("You must be logged in to view this page.");
        window.location.href = '../customer/login.html';
    }
}

function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                // Clear all auth data
                localStorage.removeItem('jwt_token');
                localStorage.removeItem('user');

                // Redirect to main customer home page
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
    function setupLogout() {
        // Select ALL elements with the class 'logout-link'
        const logoutLinks = document.querySelectorAll('.logout-link');

        // Loop through each button and add the click listener
        logoutLinks.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();

                const role = window.location.pathname.includes('delivery') ? 'End shift and logout?' : 'Are you sure you want to logout?';

                if (confirm(role)) {
                    // Clear all auth data
                    localStorage.removeItem('jwt_token');
                    localStorage.removeItem('user');

                    // Redirect to the main customer home page (or login page)
                    // Adjust this path if your folder structure is different
                    window.location.href = '../customer/index.html';
                }
            });
        });
    }
}