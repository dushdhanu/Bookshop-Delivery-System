// Admin Books Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.querySelector('.search-bar .form-input');
    const searchButton = document.querySelector('.search-bar .btn');
    
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                performSearch(searchTerm);
            }
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = searchInput.value.trim();
                if (searchTerm) {
                    performSearch(searchTerm);
                }
            }
        });
    }
    
    // Filter by category
    const categoryFilter = document.querySelector('.filter-options select');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            filterByCategory(this.value);
        });
    }
    
    // Handle delete buttons
    const deleteButtons = document.querySelectorAll('.btn-danger');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const bookTitle = row.cells[1].textContent;
            deleteBook(row, bookTitle);
        });
    });
});

// Perform search
function performSearch(term) {
    // In a real application, this would filter the books based on the search term
    console.log(`Searching for: ${term}`);
    
    // Show search results message
    showAlert(`Showing results for "${term}"`, 'info');
}

// Filter books by category
function filterByCategory(category) {
    console.log(`Filtering by category: ${category}`);
    // In a real application, this would filter the books by category
    
    if (category === '') {
        showAlert('Showing all books', 'info');
    } else {
        showAlert(`Showing books in category: ${category}`, 'info');
    }
}

// Delete book
function deleteBook(row, bookTitle) {
    if (confirm(`Are you sure you want to delete "${bookTitle}"?`)) {
        // In a real application, this would send a delete request to the server
        console.log(`Deleting book: ${bookTitle}`);
        
        // Show loading state
        const originalText = row.cells[7].innerHTML;
        row.cells[7].innerHTML = '<span>Deleting...</span>';
        
        // Simulate API call delay
        setTimeout(() => {
            // Remove the row
            row.remove();
            
            // Show success message
            showAlert(`"${bookTitle}" has been deleted successfully!`, 'success');
        }, 1000);
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
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}