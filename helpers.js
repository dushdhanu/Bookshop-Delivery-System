// Helper functions for the website

// Initialize footer functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add current year to footer copyright
    const currentYear = new Date().getFullYear();
    const copyrightElements = document.querySelectorAll('.footer-bottom p');
    
    copyrightElements.forEach(element => {
        element.innerHTML = `&copy; ${currentYear} BookShop. All rights reserved.`;
    });
    
    // Handle social media links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.textContent;
            console.log(`Navigating to ${platform}`);
            // In a real application, this would redirect to the social media platform
            showAlert(`Redirecting to ${platform}...`, 'info');
        });
    });
    
    // Handle footer link clicks
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.textContent;
            console.log(`Navigating to ${page}`);
            // In a real application, this would redirect to the appropriate page
            showAlert(`Navigating to ${page}...`, 'info');
        });
    });
});

// Show alert messages
function showAlert(message, type = 'success') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'info' ? 'warning' : type}`;
    alertDiv.textContent = message;
    
    // Insert at the top of the container
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
    }
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 3000);
}

// Smooth scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}