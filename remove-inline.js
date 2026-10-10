const fs = require('fs');
let c = fs.readFileSync('customer/index.html', 'utf8');

c = c.replace(/<script>\s*\/\/\s*Mobile menu toggle\s*document\.addEventListener\('DOMContentLoaded', function\(\) \{\s*\/\/\s*Add to cart functionality\s*const addToCartButtons = document\.querySelectorAll\('\.btn-secondary'\);\s*addToCartButtons\.forEach\(button => \{\s*button\.addEventListener\('click', function\(\) \{\s*const bookCard = this\.closest\('\.book-card'\);\s*const bookTitle = bookCard\.querySelector\('h3'\)\.textContent;\s*\/\/\s*In a real app, this would add the book to a cart\s*alert\(`Added "\${bookTitle}" to your cart!`\);\s*\}\);\s*\}\);\s*\}\);\s*<\/script>/g, '');

fs.writeFileSync('customer/index.html', c);
