package ac.nsbm.bookshop_delivery_system.service;

import ac.nsbm.bookshop_delivery_system.entity.Book;
import ac.nsbm.bookshop_delivery_system.entity.User;
import ac.nsbm.bookshop_delivery_system.repository.BookRepository;
import ac.nsbm.bookshop_delivery_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    // 1. Method to get all books
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // 2. Method to get a single book by ID
    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    // 3. FIXED: Method to save a new book with seller association and Transactional
    @Transactional
    public Book saveBook(Book book, String email) {
        // Fetch the persistent User object from the database using the email
        User seller = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        // Link the book to the persistent user entity
        book.setSeller(seller);

        return bookRepository.save(book);
    }

    // 4. FIXED: Added @Transactional and updated all fields from entity
    @Transactional
    public Book updateBook(Long id, Book bookDetails) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));

        // Update all fields
        book.setTitle(bookDetails.getTitle());
        book.setAuthor(bookDetails.getAuthor());
        book.setPrice(bookDetails.getPrice());
        book.setDescription(bookDetails.getDescription());
        book.setStock(bookDetails.getStock());
        book.setImageUrl(bookDetails.getImageUrl());
        book.setCategory(bookDetails.getCategory());

        return bookRepository.save(book);
    }

    // 5. Method to delete a book
    @Transactional
    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new RuntimeException("Book not found with id: " + id);
        }
        bookRepository.deleteById(id);
    }
}