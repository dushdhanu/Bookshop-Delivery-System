const API_BASE_URL = 'http://localhost:8080/api';

function getAuthHeaders() {
    const token = localStorage.getItem('jwt_token');
    return { 'Authorization': `Bearer ${token}` };
}

document.addEventListener('DOMContentLoaded', function() {
    const addBookForm = document.getElementById('addBookForm');
    if (addBookForm) {
        addBookForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addBook();
        });
    }
});

async function addBook() {
    const form = document.getElementById('addBookForm');
    const formData = new FormData(form);

    formData.set('featured', document.getElementById('featured').checked);

    const submitBtn = form.querySelector('.btn-primary');
    submitBtn.textContent = 'Uploading...';
    submitBtn.disabled = true;

    try {
        const response = await fetch(`${API_BASE_URL}/books`, {
            method: 'POST',
            headers: getAuthHeaders(),
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