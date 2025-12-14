package ac.nsbm.bookshop_delivery_system.repository;
import ac.nsbm.bookshop_delivery_system.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {}