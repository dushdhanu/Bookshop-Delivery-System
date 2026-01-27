// Books Page JavaScript for Bookseller

document.addEventListener('DOMContentLoaded', function() {
    // --- NEW: Add Book Form Submission ---
    const addBookForm = document.getElementById('addBookForm');
    if (addBookForm) {
        addBookForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Uploading...';

            const formData = new FormData();
            const imageFile = document.getElementById('bookImage').files[0];

            // Construct metadata object to match the "Book" entity in Java
            const bookData = {
                title: document.getElementById('bookTitle').value,
                author: document.getElementById('author').value,
                isbn: document.getElementById('isbn').value,
                category: document.getElementById('category').value,
                price: parseFloat(document.getElementById('price').value),
                stock: parseInt(document.getElementById('stock').value),
                description: document.getElementById('description').value
            };

            // Convert object to a JSON Blob so @RequestPart can read it as application/json
            formData.append('book', new Blob([JSON.stringify(bookData)], { type: 'application/json' }));

            if (imageFile) {
                formData.append('file', imageFile);
            }

            try {
                const token = localStorage.getItem('token');
                const response = await fetch('/api/books/add', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                        // Note: Do NOT set Content-Type header; FormData sets the multipart boundary automatically
                    },
                    body: formData
                });

                if (response.ok) {
                    showAlert('Book added successfully!', 'success');
                    setTimeout(() => window.location.href = 'books.html', 1500);
                } else {
                    const error = await response.json();
                    showAlert('Error: ' + (error.message || 'Failed to add book'), 'danger');
                }
            } catch (error) {
                console.error('Upload error:', error);
                showAlert('Server connection failed.', 'danger');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Add Book';
            }
        });
    }

    // --- ORIGINAL: Edit book functionality ---
    const editBookButtons = document.querySelectorAll('.btn-secondary');
    editBookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookCard = this.closest('.book-card');
            const bookTitle = bookCard.querySelector('h3').textContent;
            editBook(bookTitle);
        });
    });

    // --- ORIGINAL: Delete book functionality ---
    const deleteBookButtons = document.querySelectorAll('.btn-danger');
    deleteBookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookCard = this.closest('.book-card');
            const bookTitle = bookCard.querySelector('h3').textContent;
            deleteBook(bookTitle, bookCard);
        });
    });

    // --- ORIGINAL: Search functionality ---
    const searchInput = document.querySelector('.search-bar .form-input');
    const searchButton = document.querySelector('.search-bar .btn');
    if (searchButton) {
        searchButton.addEventListener('click', () => performSearch(searchInput.value.trim()));
    }
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch(searchInput.value.trim());
        });
    }
});

// Edit book function
function editBook(bookTitle) {
    console.log(`Editing "${bookTitle}"`);
    showAlert(`Redirecting to edit "${bookTitle}"`, 'info');
    // window.location.href = 'edit-book.html';
}

// Delete book function
function deleteBook(bookTitle, bookElement) {
    if (confirm(`Are you sure you want to delete "${bookTitle}"? This action cannot be undone.`)) {
        console.log(`Deleting "${bookTitle}"`);
        const deleteButton = bookElement.querySelector('.btn-danger');
        deleteButton.textContent = 'Deleting...';
        deleteButton.disabled = true;

        // Simulate API call and DOM removal
        setTimeout(() => {
            bookElement.remove();
            showAlert(`"${bookTitle}" has been deleted successfully!`, 'success');
        }, 1000);
    }
}

// Search function
function performSearch(term) {
    if (!term) return;
    console.log(`Searching for: ${term}`);
    const resultsInfo = document.querySelector('.results-info p');
    if (resultsInfo) resultsInfo.textContent = `Showing results for "${term}"`;

    const bookTitles = document.querySelectorAll('.book-card h3');
    bookTitles.forEach(title => {
        const text = title.textContent;
        title.style.backgroundColor = text.toLowerCase().includes(term.toLowerCase()) ? '#fff3cd' : '';
    });
}

// Unified Alert system
function showAlert(message, type = 'success') {
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) existingAlert.remove();

    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'info' ? 'warning' : type}`;
    alertDiv.textContent = message;

    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
    }

    setTimeout(() => {
        if (alertDiv.parentNode) alertDiv.remove();
    }, 5000);
}