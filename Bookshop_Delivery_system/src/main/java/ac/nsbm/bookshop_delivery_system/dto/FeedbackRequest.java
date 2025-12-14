package ac.nsbm.bookshop_delivery_system.dto;

public class FeedbackRequest {
    private Integer rating;
    private String message;

    // --- CONSTRUCTORS ---
    public FeedbackRequest() {}

    public FeedbackRequest(Integer rating, String message) {
        this.rating = rating;
        this.message = message;
    }

    // --- GETTERS AND SETTERS ---
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}