package ac.nsbm.bookshop_delivery_system.dto;

public class AuthResponse {
    private String token;

    // 1. No-argument constructor
    public AuthResponse() {
    }

    // 2. Constructor with arguments (Fixes the error)
    public AuthResponse(String token) {
        this.token = token;
    }

    // 3. Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}