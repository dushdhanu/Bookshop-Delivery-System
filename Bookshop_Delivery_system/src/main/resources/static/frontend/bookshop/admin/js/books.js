document.addEventListener('DOMContentLoaded', () => {
    loadBooks();
});

const API_URL = '/api/books'; // Ensure this matches your backend

async function loadBooks() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}` // Send Token
            }
        });

        if (!response.ok) throw new Error('Failed to load books');

        const books = await response.json();
        const tableBody = document.querySelector('tbody'); // Targets the table body
        tableBody.innerHTML = ''; // Clear existing rows

        books.forEach(book => {
            const row = `
                <tr>
                    <td>${book.id}</td>
                    <td><img src="${book.imageUrl}" alt="Cover" style="width:50px;height:75px;object-fit:cover;"></td>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>$${book.price}</td>
                    <td>${book.category}</td>
                    <td>${book.stockQuantity}</td>
                    <td>
                        <button class="btn-edit" data-id="${book.id}">Edit</button>
                        <button class="btn-delete" data-id="${book.id}">Delete</button>
                    </td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        });

    } catch (error) {
        console.error('Error:', error);
        alert('Could not load books. Please login again.');
    }
}

// --- CRITICAL FIX: EVENT DELEGATION ---
// We attach the listener to the TABLE (parent), not the buttons
document.querySelector('table').addEventListener('click', async (e) => {
    const token = localStorage.getItem('token');

    // HANDLE DELETE CLICK
    if (e.target.classList.contains('btn-delete')) {
        const bookId = e.target.getAttribute('data-id');

        if (!confirm('Are you sure you want to delete this book?')) return;

        try {
            const response = await fetch(`${API_URL}/${bookId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                alert('Book deleted successfully');
                // Remove the row from UI immediately without reload
                e.target.closest('tr').remove();
            } else {
                const errorData = await response.text();
                alert(`Error deleting book: ${errorData}`);
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete book.');
        }
    }

    // HANDLE EDIT CLICK
    if (e.target.classList.contains('btn-edit')) {
        const bookId = e.target.getAttribute('data-id');
        // Redirect to edit page with ID
        window.location.href = `edit-book.html?id=${bookId}`;
    }
});