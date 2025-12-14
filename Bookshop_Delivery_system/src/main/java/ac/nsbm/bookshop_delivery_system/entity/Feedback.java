package ac.nsbm.bookshop_delivery_system.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "feedbacks")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private Integer rating; // 1 to 5

    @Column(length = 1000)
    private String message;

    private LocalDateTime date;

    // --- CONSTRUCTORS ---
    public Feedback() {
    }

    public Feedback(User user, Integer rating, String message, LocalDateTime date) {
        this.user = user;
        this.rating = rating;
        this.message = message;
        this.date = date;
    }

    // --- MANUAL GETTERS AND SETTERS ---

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }
}