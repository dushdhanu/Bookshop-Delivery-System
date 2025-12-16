package ac.nsbm.bookshop_delivery_system.util;

import ac.nsbm.bookshop_delivery_system.entity.Book;
import ac.nsbm.bookshop_delivery_system.entity.Role;
import ac.nsbm.bookshop_delivery_system.entity.User;
import ac.nsbm.bookshop_delivery_system.repository.BookRepository;
import ac.nsbm.bookshop_delivery_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {

        // --- 1. Initialize Users ---
        if (userRepository.count() == 0) {
            System.out.println("No users found. Creating admin and customer...");

            // Create Admin
            User admin = new User();
            admin.setFirstName("Super");
            admin.setLastName("Admin");
            admin.setEmail("admin@bookshop.com"); // Used as login
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ADMIN); // Singular Role
            admin.setAddress("Head Office, Colombo");
            admin.setPhone("0771234567");
            admin.setNotifications(true);
            userRepository.save(admin);

            // Create Customer
            User customer = new User();
            customer.setFirstName("John");
            customer.setLastName("Doe");
            customer.setEmail("customer@gmail.com"); // Used as login
            customer.setPassword(passwordEncoder.encode("customer123"));
            customer.setRole(Role.CUSTOMER); // Singular Role
            customer.setAddress("123 Galle Road, Colombo");
            customer.setPhone("0719876543");
            customer.setNotifications(true);
            userRepository.save(customer);

            System.out.println("Users created: admin@bookshop.com / customer@gmail.com");
        }

        // --- 2. Initialize Books ---
        if (bookRepository.count() == 0) {
            System.out.println("No books found. Adding sample books...");

            // Book 1
            Book b1 = new Book();
            b1.setTitle("The Great Gatsby");
            b1.setAuthor("F. Scott Fitzgerald");
            b1.setPrice(1500.00);
            b1.setStock(10); // Changed from setQuantity to setStock
            b1.setCategory("Classic"); // Required field
            b1.setDescription("A classic novel of the Jazz Age.");
            b1.setImageUrl("/images/book1.jpg");
            bookRepository.save(b1);

            // Book 2
            Book b2 = new Book();
            b2.setTitle("Clean Code");
            b2.setAuthor("Robert C. Martin");
            b2.setPrice(4500.00);
            b2.setStock(5);
            b2.setCategory("Technology");
            b2.setDescription("A Handbook of Agile Software Craftsmanship.");
            b2.setImageUrl("/images/book2.jpg");
            bookRepository.save(b2);

            // Book 3
            Book b3 = new Book();
            b3.setTitle("Harry Potter and the Sorcerer's Stone");
            b3.setAuthor("J.K. Rowling");
            b3.setPrice(2200.00);
            b3.setStock(20);
            b3.setCategory("Fantasy");
            b3.setDescription("The first book in the Harry Potter series.");
            b3.setImageUrl("/images/book3.jpg");
            bookRepository.save(b3);

            // Book 4
            Book b4 = new Book();
            b4.setTitle("Introduction to Algorithms");
            b4.setAuthor("Thomas H. Cormen");
            b4.setPrice(5500.00);
            b4.setStock(3);
            b4.setCategory("Education");
            b4.setDescription("Comprehensive guide to computer algorithms.");
            b4.setImageUrl("/images/book4.jpg");
            bookRepository.save(b4);

            // Book 5
            Book b5 = new Book();
            b5.setTitle("Sherlock Holmes: Complete Novels");
            b5.setAuthor("Arthur Conan Doyle");
            b5.setPrice(1800.00);
            b5.setStock(15);
            b5.setCategory("Mystery");
            b5.setDescription("The complete collection of Sherlock Holmes.");
            b5.setImageUrl("/images/book5.jpg");
            bookRepository.save(b5);

            System.out.println("Database initialized with 5 books.");
        }
    }
}