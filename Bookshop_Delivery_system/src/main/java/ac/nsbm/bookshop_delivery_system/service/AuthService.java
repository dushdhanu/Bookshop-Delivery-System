package ac.nsbm.bookshop_delivery_system.service;

import ac.nsbm.bookshop_delivery_system.dto.AuthRequest;
import ac.nsbm.bookshop_delivery_system.dto.AuthResponse;
import ac.nsbm.bookshop_delivery_system.dto.RegisterRequest;
import ac.nsbm.bookshop_delivery_system.entity.Role;
import ac.nsbm.bookshop_delivery_system.entity.User;
import ac.nsbm.bookshop_delivery_system.repository.UserRepository;
import ac.nsbm.bookshop_delivery_system.util.JwtUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse register(RegisterRequest request) {
        if(userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        try {
            String roleStr = (request.getRole() == null || request.getRole().isEmpty()) ? "CUSTOMER" : request.getRole().toUpperCase();
            user.setRole(Role.valueOf(roleStr));
        } catch (IllegalArgumentException e) {
            user.setRole(Role.CUSTOMER);
        }

        userRepository.save(user);
        String token = jwtUtils.generateToken(new CustomUserDetails(user));
        return new AuthResponse(token, user.getRole().name());
    }

    public AuthResponse login(AuthRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (Exception e) {
            throw new BadCredentialsException("Invalid email or password");
        }

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtils.generateToken(new CustomUserDetails(user));
        return new AuthResponse(token, user.getRole().name());
    }
}