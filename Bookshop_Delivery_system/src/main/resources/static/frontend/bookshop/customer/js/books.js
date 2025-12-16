let allBooks = [];

document.addEventListener("DOMContentLoaded", function () {
    loadBooks();
    updateCartBadge();
});

function loadBooks() {
    console.log("Fetching books..."); // Debugging check

    fetch('/api/books')
        .then(res => {
            if (!res.ok) throw new Error("Failed to fetch books: " + res.status);
            return res.json();
        })
        .then(data => {
            console.log("Books loaded:", data);
            allBooks = data;
            const container = document.getElementById('books-container');
            container.innerHTML = ''; // Clear loading text

            if (data.length === 0) {
                container.innerHTML = '<p>No books found in database.</p>';
                return;
            }

            data.forEach(book => {
                // Use default if null
                let imgUrl = book.imageUrl ? book.imageUrl : 'https://via.placeholder.com/200?text=No+Cover';

                const card = `
                    <div class="book-card">
                        <img src="${imgUrl}" alt="${book.title}">
                        <h3>${book.title}</h3>
                        <p style="color:#aaa; font-size:0.9em;">${book.author}</p>
                        <p class="price">$${book.price.toFixed(2)}</p>
                        <button onclick="addToCart(${book.id})" class="btn-add">Add to Cart</button>
                    </div>
                `;
                container.innerHTML += card;
            });
        })
        .catch(err => {
            console.error(err);
            document.getElementById('books-container').innerHTML =
                '<p style="color:red;">Error loading books. Backend may be offline.</p>';
        });
}

function addToCart(id) {
    const book = allBooks.find(b => b.id === id);
    if (!book) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id: book.id, title: book.title, price: book.price, image: book.imageUrl, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    alert(book.title + " added to cart!");
}

function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.innerText = count;
        badge.style.display = count > 0 ? 'inline-block' : 'none';
    }
}