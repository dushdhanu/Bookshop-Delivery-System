/* File: Bookshop_Delivery_system/src/main/resources/static/frontend/bookshop/customer/js/books.js */

document.addEventListener('DOMContentLoaded', function() {
    fetchBooks();
    setupCustomDropdown();
});

async function fetchBooks(search = '', category = '') {
    const container = document.querySelector('.book-grid'); // Changed class to match CSS
    if(!container) return;

    let url = 'http://localhost:8080/api/books';
    const params = new URLSearchParams();
    if(search) params.append('search', search);
    if(category && category !== 'all') params.append('category', category);

    if(Array.from(params).length > 0) {
        url += `?${params.toString()}`;
    }

    try {
        const response = await fetch(url);
        if(response.ok) {
            const books = await response.json();
            renderBooks(books, container);
        } else {
            console.error('Failed to fetch books');
            container.innerHTML = '<p>No books found or server error.</p>';
        }
    } catch (e) {
        console.error('Error:', e);
    }
}

function renderBooks(books, container) {
    container.innerHTML = '';
    if (books.length === 0) {
        container.innerHTML = '<p>No books found matching your criteria.</p>';
        return;
    }

    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        // Handle image path safely
        const imgUrl = book.imageUrl ? `http://localhost:8080${book.imageUrl}` : '../images/placeholder.jpg';

        card.innerHTML = `
            <img src="${imgUrl}" alt="${book.title}" class="book-image">
            <h3>${book.title}</h3>
            <p class="author">${book.author}</p>
            <p class="price">$${book.price}</p>
            <button class="btn btn-secondary" onclick="addToCart(${book.id}, '${book.title}', ${book.price})">Add to Cart</button>
        `;
        container.appendChild(card);
    });
}

function addToCart(id, title, price) {
    let cart = JSON.parse(localStorage.getItem('bookshopCart')) || [];
    const item = cart.find(i => i.bookId === id);
    if(item) {
        item.quantity++;
    } else {
        cart.push({ bookId: id, title: title, price: price, quantity: 1 });
    }
    localStorage.setItem('bookshopCart', JSON.stringify(cart));
    alert(`${title} added to cart!`);
}

// Custom Dropdown Logic
function setupCustomDropdown() {
    const selectSelected = document.querySelector('.select-selected');
    const selectItems = document.querySelector('.select-items');

    if(!selectSelected || !selectItems) return;

    selectSelected.addEventListener('click', function(e) {
        e.stopPropagation();
        selectItems.classList.toggle('select-show');
        this.classList.toggle('select-arrow-active');
    });

    const selectOptions = selectItems.querySelectorAll('div');
    selectOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            const value = this.getAttribute('data-value');
            const text = this.textContent;

            selectSelected.textContent = text;
            selectItems.classList.remove('select-show');
            selectSelected.classList.remove('select-arrow-active');

            // Trigger fetch with new category
            const searchInput = document.querySelector('.search-input');
            const searchValue = searchInput ? searchInput.value : '';
            fetchBooks(searchValue, value);
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        selectItems.classList.remove('select-show');
        selectSelected.classList.remove('select-arrow-active');
    });

    // Search listener
    const searchBtn = document.querySelector('.search-icon-btn');
    const searchInput = document.querySelector('.search-input');
    if(searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            // Get current category if any
            const currentCategoryText = selectSelected.textContent;
            // You might need to map text back to value or store value in a data attribute on selectSelected
            fetchBooks(searchInput.value);
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                fetchBooks(searchInput.value);
            }
        });
    }
}