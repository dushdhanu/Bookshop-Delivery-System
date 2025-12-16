package ac.nsbm.bookshop_delivery_system.repository;

import ac.nsbm.bookshop_delivery_system.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Correctly find user by Email since 'username' field does not exist
    Optional<User> findByEmail(String email);
}