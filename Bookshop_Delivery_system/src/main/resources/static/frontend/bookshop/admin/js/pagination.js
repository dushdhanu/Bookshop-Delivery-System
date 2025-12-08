// Admin Pagination JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Handle pagination clicks
    const paginationLinks = document.querySelectorAll('.pagination a');
    
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the page number or action
            const page = this.textContent;
            
            // Update active page
            updateActivePage(this);
            
            // Load page content
            loadPageContent(page);
        });
    });
});

// Update active page in pagination
function updateActivePage(activeLink) {
    // Remove active class from all links
    document.querySelectorAll('.pagination .page-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked link's parent
    activeLink.parentElement.classList.add('active');
}

// Load page content
function loadPageContent(page) {
    // In a real application, this would load content via AJAX
    console.log(`Loading page: ${page}`);
    
    // For demonstration, we'll just scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Show loading indicator
    showLoadingIndicator();
    
    // Simulate loading delay
    setTimeout(() => {
        hideLoadingIndicator();
        
        // Update results info
        const resultsInfo = document.querySelector('.results-info p');
        if (resultsInfo) {
            // This would be dynamic in a real app
            resultsInfo.textContent = `Showing ${(page-1)*10+1}-${page*10} of 50 results`;
        }
        
        // Show success message
        showAlert(`Loaded page ${page}`, 'info');
    }, 500);
}

// Show loading indicator
function showLoadingIndicator() {
    // Create loading element if it doesn't exist
    let loadingDiv = document.getElementById('loading-indicator');
    if (!loadingDiv) {
        loadingDiv = document.createElement('div');
        loadingDiv.id = 'loading-indicator';
        loadingDiv.innerHTML = '<div class="loading-spinner"></div><p>Loading...</p>';
        loadingDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.7);
            color: white;
            padding: 20px;
            border-radius: 5px;
            z-index: 1000;
            text-align: center;
        `;
        document.body.appendChild(loadingDiv);
    }
    
    loadingDiv.style.display = 'block';
}

// Hide loading indicator
function hideLoadingIndicator() {
    const loadingDiv = document.getElementById('loading-indicator');
    if (loadingDiv) {
        loadingDiv.style.display = 'none';
    }
}

// Go to specific page
function goToPage(pageNumber) {
    // Find the page link and trigger click
    const pageLink = document.querySelector(`.pagination a[href]:not(.prev):not(.next)`);
    if (pageLink) {
        pageLink.click();
    }
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
    
    // Insert at the top of the main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.insertBefore(alertDiv, mainContent.firstChild);
    }
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 3000);
}