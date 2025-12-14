// Bookseller API JavaScript

// Helper to get Token
function getAuthHeaders() {
    const token = localStorage.getItem('accessToken');
    return { 'Authorization': `Bearer ${token}` };
}

document.addEventListener('DOMContentLoaded', function() {
    // Add Book Listener
    const addBookForm = document.getElementById('addBookForm');
    if (addBookForm) {
        addBookForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addBook();
        });
    }
});

async function addBook() {
    // 1. Gather Data
    const form = document.getElementById('addBookForm');
    const formData = new FormData(form);

    // 2. Handle Checkboxes Manually
    formData.set('featured', document.getElementById('featured').checked);
    // If you have an 'active' checkbox, handle it here too

    const submitBtn = form.querySelector('.btn-primary');
    submitBtn.textContent = 'Uploading...';
    submitBtn.disabled = true;

    try {
        // 3. Send Request
        const response = await fetch('http://localhost:8080/api/books', {
            method: 'POST',
            headers: getAuthHeaders(), // Do NOT set Content-Type for FormData
            body: formData
        });

        if (response.ok) {
            alert('Book added successfully!');
            window.location.href = 'books.html';
        } else {
            const error = await response.text();
            alert('Failed to add book: ' + error);
        }
    } catch (err) {
        console.error(err);
        alert('Network error.');
    } finally {
        submitBtn.textContent = 'Add Book';
        submitBtn.disabled = false;
    }
}