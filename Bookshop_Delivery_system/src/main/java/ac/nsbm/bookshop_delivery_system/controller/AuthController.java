package ac.nsbm.bookshop_delivery_system.controller;

import ac.nsbm.bookshop_delivery_system.dto.AuthRequest;
import ac.nsbm.bookshop_delivery_system.dto.AuthResponse;
import ac.nsbm.bookshop_delivery_system.dto.RegisterRequest;
import ac.nsbm.bookshop_delivery_system.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        String token = authService.register(request);
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        String token = authService.login(request);
        return ResponseEntity.ok(new AuthResponse(token));
    }

    // --- NEW LOGOUT ENDPOINT ---
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // Since we are using stateless JWT, the server doesn't hold a session.
        // The client is responsible for deleting the token.
        // We return OK to acknowledge the request.
        return ResponseEntity.ok().body("Logged out successfully");
    }
}