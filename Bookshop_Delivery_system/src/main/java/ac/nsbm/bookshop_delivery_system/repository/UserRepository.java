package ac.nsbm.bookshop_delivery_system.repository;

import ac.nsbm.bookshop_delivery_system.entity.Role;
import ac.nsbm.bookshop_delivery_system.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmployeeId(String employeeId);
    List<User> findByRole(Role role);
}
