package ac.nsbm.bookshop_delivery_system.repository;

import ac.nsbm.bookshop_delivery_system.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    // Custom query methods can be added here if needed
}