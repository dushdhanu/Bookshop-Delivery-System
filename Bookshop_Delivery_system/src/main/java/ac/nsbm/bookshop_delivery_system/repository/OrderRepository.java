package ac.nsbm.bookshop_delivery_system.repository;

import ac.nsbm.bookshop_delivery_system.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    // Finds all orders for a specific user (Required for "My Orders" page)
    List<Order> findAllByEmail(String email);
}