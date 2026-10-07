// Customer Books Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.btn-secondary');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookCard = this.closest('.book-card');
            const bookTitle = bookCard.querySelector('h3').textContent;
            
            // Add to cart functionality
            addToCart(bookTitle);
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

// Add book to cart
function addToCart(bookTitle) {
    // In a real application, this would add the book to a shopping cart
    // For now, we'll just show an alert
    
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success';
    alertDiv.textContent = `"${bookTitle}" has been added to your cart!`;
    
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
    
    console.log(`Added "${bookTitle}" to cart`);
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
}

// Filter books by category
function filterByCategory(category) {
    console.log(`Filtering by category: ${category}`);
    // In a real application, this would filter the books by category
}

// Sort books
function sortBooks(sortOption) {
    console.log(`Sorting by: ${sortOption}`);
    // In a real application, this would sort the books
}