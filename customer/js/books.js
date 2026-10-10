// Customer Books Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.btn-secondary');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.textContent.trim() !== 'Add to Cart') return;
            
            const bookCard = this.closest('.book-card');
            if (!bookCard) return;
            
            const bookTitle = bookCard.querySelector('h3').textContent;
            const authorEl = bookCard.querySelector('.author');
            const priceEl = bookCard.querySelector('.price');
            const imgEl = bookCard.querySelector('.book-image');
            
            const bookDetails = {
                title: bookTitle,
                author: authorEl ? authorEl.textContent : '',
                price: priceEl ? priceEl.textContent : '',
                image: imgEl ? imgEl.getAttribute('src') : ''
            };
            
            // Add to cart functionality
            addToCart(bookDetails);
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
function addToCart(bookDetails) {
    // Save to local storage for wishlist
    const bookTitle = typeof bookDetails === 'string' ? bookDetails : bookDetails.title;
    
    if (typeof bookDetails === 'object') {
        let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        // Check if already in wishlist by title
        if (!wishlist.some(item => item.title === bookDetails.title)) {
            wishlist.push(bookDetails);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        }
    }

    // Check if Swal is available
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: 'Added to Wishlist!',
            text: `"${bookTitle}" has been added to your wishlist.`,
            icon: 'success',
            background: '#1a1a2e',
            color: '#ffffff',
            confirmButtonColor: '#3b82f6',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
        });
    } else {
        alert(`Added "${bookTitle}" to your wishlist!`);
    }
    console.log(`Added "${bookTitle}" to wishlist`);
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