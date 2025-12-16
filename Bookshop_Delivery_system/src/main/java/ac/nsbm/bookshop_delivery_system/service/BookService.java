package ac.nsbm.bookshop_delivery_system.service; // Check package

import ac.nsbm.bookshop_delivery_system.entity.Book;
import ac.nsbm.bookshop_delivery_system.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    // 1. Method to get all books
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // 2. Method to get a single book by ID
    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    // 3. Method to save a new book
    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    // 4. Method to update an existing book
    public Book updateBook(Long id, Book bookDetails) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));

        // Update fields
        book.setTitle(bookDetails.getTitle());
        book.setAuthor(bookDetails.getAuthor());
        book.setPrice(bookDetails.getPrice());
        book.setDescription(bookDetails.getDescription());

        return bookRepository.save(book);
    }

    // 5. Method to delete a book
    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new RuntimeException("Book not found with id: " + id);
        }
        bookRepository.deleteById(id);
    }
}