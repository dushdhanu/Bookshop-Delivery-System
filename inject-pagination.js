const fs = require('fs');
let html = fs.readFileSync('customer/books.html', 'utf8');

const script = `
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Book data for pagination
            const allBooks = [
                // Original Page 1
                { img: '../images/Gbook.jpg', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: '$12.99' },
                { img: '../images/Hbook.jpg', title: 'To Kill a Mockingbird', author: 'Harper Lee', price: '$14.99' },
                { img: '../images/1984.png', title: '1984', author: 'George Orwell', price: '$13.99' },
                { img: '../images/Pbook.jpg', title: 'Pride and Prejudice', author: 'Jane Austen', price: '$11.99' },
                { img: '../cbook.jpg', title: 'The Catcher in the Rye', author: 'J.D. Salinger', price: '$12.49' },
                { img: '../Lbook.jpg', title: 'Lord of the Rings', author: 'J.R.R. Tolkien', price: '$19.99' },
                { img: '../tbook.jpg', title: 'The Hobbit', author: 'J.R.R. Tolkien', price: '$16.99' },
                { img: '../sbook.jpg', title: 'Harry Potter and the Sorcerer\\'s Stone', author: 'J.K. Rowling', price: '$15.99' },
                
                // Page 2
                { img: '../images/1984.png', title: 'Animal Farm', author: 'George Orwell', price: '$10.99' },
                { img: '../Lbook.jpg', title: 'The Silmarillion', author: 'J.R.R. Tolkien', price: '$18.99' },
                { img: '../sbook.jpg', title: 'Harry Potter and the Chamber of Secrets', author: 'J.K. Rowling', price: '$16.99' },
                { img: '../images/Pbook.jpg', title: 'Emma', author: 'Jane Austen', price: '$9.99' },
                { img: '../images/Gbook.jpg', title: 'Tender Is the Night', author: 'F. Scott Fitzgerald', price: '$14.99' },
                { img: '../cbook.jpg', title: 'Franny and Zooey', author: 'J.D. Salinger', price: '$11.49' },
                { img: '../images/Hbook.jpg', title: 'Go Set a Watchman', author: 'Harper Lee', price: '$15.99' },
                { img: '../tbook.jpg', title: 'The Children of Húrin', author: 'J.R.R. Tolkien', price: '$22.99' },
                
                // Page 3
                { img: '../images/1984.png', title: 'Brave New World', author: 'Aldous Huxley', price: '$14.99' },
                { img: '../Lbook.jpg', title: 'The Two Towers', author: 'J.R.R. Tolkien', price: '$19.99' },
                { img: '../sbook.jpg', title: 'Harry Potter and the Prisoner of Azkaban', author: 'J.K. Rowling', price: '$17.99' },
                { img: '../images/Pbook.jpg', title: 'Sense and Sensibility', author: 'Jane Austen', price: '$12.99' },
                { img: '../images/Gbook.jpg', title: 'This Side of Paradise', author: 'F. Scott Fitzgerald', price: '$13.99' },
                { img: '../cbook.jpg', title: 'Nine Stories', author: 'J.D. Salinger', price: '$10.49' },
                { img: '../images/Hbook.jpg', title: 'Mockingbird', author: 'Walter Tevis', price: '$16.99' },
                { img: '../tbook.jpg', title: 'The Fall of Gondolin', author: 'J.R.R. Tolkien', price: '$24.99' },
                
                // Page 4
                { img: '../images/1984.png', title: 'Fahrenheit 451', author: 'Ray Bradbury', price: '$11.99' },
                { img: '../Lbook.jpg', title: 'The Return of the King', author: 'J.R.R. Tolkien', price: '$19.99' },
                { img: '../sbook.jpg', title: 'Harry Potter and the Goblet of Fire', author: 'J.K. Rowling', price: '$18.99' },
                { img: '../images/Pbook.jpg', title: 'Persuasion', author: 'Jane Austen', price: '$10.99' },
                { img: '../images/Gbook.jpg', title: 'The Beautiful and Damned', author: 'F. Scott Fitzgerald', price: '$12.99' },
                { img: '../cbook.jpg', title: 'Raise High the Roof Beam', author: 'J.D. Salinger', price: '$13.49' },
                { img: '../images/Hbook.jpg', title: 'In Cold Blood', author: 'Truman Capote', price: '$14.99' },
                { img: '../tbook.jpg', title: 'Beren and Lúthien', author: 'J.R.R. Tolkien', price: '$21.99' },
                
                // Page 5
                { img: '../images/1984.png', title: 'The Handmaid\\'s Tale', author: 'Margaret Atwood', price: '$15.99' },
                { img: '../Lbook.jpg', title: 'Unfinished Tales', author: 'J.R.R. Tolkien', price: '$17.99' },
                { img: '../sbook.jpg', title: 'Harry Potter and the Order of the Phoenix', author: 'J.K. Rowling', price: '$19.99' },
                { img: '../images/Pbook.jpg', title: 'Mansfield Park', author: 'Jane Austen', price: '$11.99' },
                { img: '../images/Gbook.jpg', title: 'The Last Tycoon', author: 'F. Scott Fitzgerald', price: '$16.99' },
                { img: '../cbook.jpg', title: 'Seymour: An Introduction', author: 'J.D. Salinger', price: '$9.49' },
                { img: '../images/Hbook.jpg', title: 'To Kill a Mockingbird (Special)', author: 'Harper Lee', price: '$24.99' },
                { img: '../tbook.jpg', title: 'The Fellowship of the Ring', author: 'J.R.R. Tolkien', price: '$19.99' }
            ];

            const itemsPerPage = 8;
            let currentPage = 1;
            const totalPages = 5;

            const grid = document.querySelector('.books-grid');
            const pageButtons = document.querySelectorAll('.page-numbers button');
            const prevButton = document.querySelector('.pagination > button:first-child');
            const nextButton = document.querySelector('.pagination > button:last-child');

            function renderPage(page) {
                grid.innerHTML = '';
                const start = (page - 1) * itemsPerPage;
                const end = start + itemsPerPage;
                const pageBooks = allBooks.slice(start, end);

                pageBooks.forEach(book => {
                    const card = document.createElement('div');
                    card.className = 'book-card';
                    card.innerHTML = \`
                        <img src="\${book.img}" alt="\${book.title}" class="book-image">
                        <h3>\${book.title}</h3>
                        <p class="author">\${book.author}</p>
                        <p class="price">\${book.price}</p>
                        <button class="btn btn-secondary">Add to Cart</button>
                    \`;
                    grid.appendChild(card);
                });

                // Update active state
                pageButtons.forEach(btn => {
                    if (parseInt(btn.textContent) === page) {
                        btn.className = 'btn btn-primary';
                    } else {
                        btn.className = 'btn btn-secondary';
                    }
                });

                currentPage = page;
                
                prevButton.disabled = currentPage === 1;
                nextButton.disabled = currentPage === totalPages;
            }

            pageButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    renderPage(parseInt(btn.textContent));
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                });
            });

            prevButton.addEventListener('click', () => {
                if (currentPage > 1) {
                    renderPage(currentPage - 1);
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                }
            });

            nextButton.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    renderPage(currentPage + 1);
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                }
            });
            
            // Initial render
            renderPage(1);
        });
    </script>
`;

html = html.replace('</body>', script + '\n</body>');
fs.writeFileSync('customer/books.html', html);
