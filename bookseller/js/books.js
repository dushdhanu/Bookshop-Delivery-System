// Books Page JavaScript for Bookseller

document.addEventListener('DOMContentLoaded', function() {
    // Edit book functionality
    const editBookButtons = document.querySelectorAll('.btn-secondary');
    
    editBookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookCard = this.closest('.book-card');
            const bookTitle = bookCard.querySelector('h3').textContent;
            
            // Edit book functionality
            editBook(bookTitle);
        });
    });
    
    // Delete book functionality
    const deleteBookButtons = document.querySelectorAll('.btn-danger');
    
    deleteBookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookCard = this.closest('.book-card');
            const bookTitle = bookCard.querySelector('h3').textContent;
            
            // Delete book functionality
            deleteBook(bookTitle, bookCard);
        });
    });
    
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
});

// Edit book
function editBook(bookTitle) {
    // In a real application, this would redirect to the edit book page
    console.log(`Editing "${bookTitle}"`);
    
    // For demo purposes, show an alert
    showAlert(`Redirecting to edit "${bookTitle}"`, 'info');
    
    // In a real app, you would redirect to the edit page
    // window.location.href = 'edit-book.html';
}

// Delete book
function deleteBook(bookTitle, bookElement) {
    if (confirm(`Are you sure you want to delete "${bookTitle}"? This action cannot be undone.`)) {
        // In a real application, this would delete the book from the database
        console.log(`Deleting "${bookTitle}"`);
        
        // Show loading state
        const deleteButton = bookElement.querySelector('.btn-danger');
        const originalText = deleteButton.textContent;
        deleteButton.textContent = 'Deleting...';
        deleteButton.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Remove the book element from the DOM
            bookElement.remove();
            
            // Show success message
            showAlert(`"${bookTitle}" has been deleted successfully!`, 'success');
        }, 1000);
    }
}

// Perform search
function performSearch(term) {
    // In a real application, this would filter the books based on the search term
    console.log(`Searching for: ${term}`);
    
    // Show search results message
    const resultsInfo = document.querySelector('.results-info p');
    if (resultsInfo) {
        resultsInfo.textContent = `Showing results for "${term}"`;
    }
    
    // Highlight search term in book titles (simplified implementation)
    const bookTitles = document.querySelectorAll('.book-card h3');
    bookTitles.forEach(title => {
        const text = title.textContent;
        if (text.toLowerCase().includes(term.toLowerCase())) {
            title.style.backgroundColor = '#fff3cd';
        }
    });
    
    // Show alert for demo purposes
    showAlert(`Search results for "${term}" displayed`, 'info');
}

// Filter books by category
function filterByCategory(category) {
    console.log(`Filtering by category: ${category}`);
    // In a real application, this would filter the books by category
    
    // Show alert for demo purposes
    showAlert(`Filtered by category: ${category}`, 'info');
}

// Sort books
function sortBooks(sortOption) {
    console.log(`Sorting by: ${sortOption}`);
    // In a real application, this would sort the books
    
    // Show alert for demo purposes
    showAlert(`Sorted by: ${sortOption}`, 'info');
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
    
    // Insert at the top of the container
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
    }
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}