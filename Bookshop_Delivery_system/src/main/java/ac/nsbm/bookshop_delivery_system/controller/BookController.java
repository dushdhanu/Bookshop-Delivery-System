package ac.nsbm.bookshop_delivery_system.controller;

import ac.nsbm.bookshop_delivery_system.entity.Book;
import ac.nsbm.bookshop_delivery_system.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    // Get all books for the frontend
    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    // Get a single book by ID
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        return bookService.getBookById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * FIXED: Added POST mapping to handle adding a book.
     * It uses the Authentication object to identify the logged-in seller.
     */
    @PostMapping("/add")
    public ResponseEntity<Book> addBook(@RequestBody Book book, Authentication authentication) {
        // authentication.getName() retrieves the email/username from the security context
        String email = authentication.getName();
        Book savedBook = bookService.saveBook(book, email);
        return ResponseEntity.ok(savedBook);
    }

    // Added Delete mapping for completeness
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
}