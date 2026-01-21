package ac.nsbm.bookshop_delivery_system.controller;

import ac.nsbm.bookshop_delivery_system.dto.AuthRequest;
import ac.nsbm.bookshop_delivery_system.dto.AuthResponse;
import ac.nsbm.bookshop_delivery_system.dto.RegisterRequest;
import ac.nsbm.bookshop_delivery_system.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}