package ac.nsbm.bookshop_delivery_system.controller;

import ac.nsbm.bookshop_delivery_system.entity.Book;
import ac.nsbm.bookshop_delivery_system.entity.User;
import ac.nsbm.bookshop_delivery_system.repository.BookRepository;
import ac.nsbm.bookshop_delivery_system.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
public class BookController {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private static final String UPLOAD_DIR = "src/main/resources/static/images/";

    // --- MANUAL CONSTRUCTOR TO FIX "not initialized" ERROR ---
    public BookController(BookRepository bookRepository, UserRepository userRepository) {
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Book> getAllBooks(@RequestParam(required = false) String search) {
        if (search != null && !search.isEmpty()) {
            return bookRepository.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(search, search);
        }
        return bookRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Book> addBook(
            @RequestParam("bookTitle") String title,
            @RequestParam("author") String author,
            @RequestParam("price") Double price,
            @RequestParam("stock") Integer stock,
            @RequestParam("category") String category,
            @RequestParam(value = "bookImage", required = false) MultipartFile image,
            Authentication authentication
    ) throws IOException {

        // Find the seller (current logged-in user)
        User seller = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Book book = new Book();
        book.setTitle(title);
        book.setAuthor(author);
        book.setPrice(price);
        book.setStock(stock);
        book.setCategory(category);
        book.setSeller(seller);

        // Handle Image Upload
        if (image != null && !image.isEmpty()) {
            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, image.getBytes());
            book.setImageUrl("/images/" + fileName);
        }

        return ResponseEntity.ok(bookRepository.save(book));
    }
}