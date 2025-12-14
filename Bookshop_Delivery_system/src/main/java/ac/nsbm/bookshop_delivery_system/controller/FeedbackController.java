package ac.nsbm.bookshop_delivery_system.controller;

import ac.nsbm.bookshop_delivery_system.dto.FeedbackRequest;
import ac.nsbm.bookshop_delivery_system.entity.Feedback;
import ac.nsbm.bookshop_delivery_system.entity.User;
import ac.nsbm.bookshop_delivery_system.repository.FeedbackRepository;
import ac.nsbm.bookshop_delivery_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addFeedback(Authentication authentication, @RequestBody FeedbackRequest request) {
        // 1. Find User
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        try {
            // 2. Create Feedback Object
            Feedback feedback = new Feedback();
            feedback.setUser(user);
            feedback.setMessage(request.getMessage());
            feedback.setRating(request.getRating());
            feedback.setDate(LocalDateTime.now());

            // 3. Save to Database
            feedbackRepository.save(feedback);

            return ResponseEntity.ok("Feedback submitted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error saving feedback: " + e.getMessage());
        }
    }
}